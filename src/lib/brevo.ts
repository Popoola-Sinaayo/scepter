import { site } from "./site";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const BREVO_EMAIL_URL = "https://api.brevo.com/v3/smtp/email";

export type BrevoResult =
  | { ok: true }
  | { ok: false; status: number; message: string };

function getBrevoApiKey() {
  return process.env.BREVO_API_KEY?.trim() || null;
}

function getBrevoConfig() {
  const apiKey = getBrevoApiKey();
  const listIdRaw = process.env.BREVO_LIST_ID?.trim();
  const listId = listIdRaw ? Number(listIdRaw) : NaN;

  if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
    return null;
  }

  return { apiKey, listId };
}

async function brevoError(response: Response) {
  let message = `Brevo returned ${response.status}`;
  try {
    const data = (await response.json()) as { message?: string };
    if (data.message) message = data.message;
  } catch {
    // ignore non-JSON error bodies
  }
  return { ok: false as const, status: response.status, message };
}

/** Create or update a contact and add them to the newsletter list. */
export async function addNewsletterSubscriber(email: string): Promise<BrevoResult> {
  const config = getBrevoConfig();
  if (!config) {
    return {
      ok: false,
      status: 0,
      message: "BREVO_API_KEY or BREVO_LIST_ID is not configured.",
    };
  }

  const response = await fetch(BREVO_CONTACTS_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": config.apiKey,
    },
    body: JSON.stringify({
      email,
      listIds: [config.listId],
      updateEnabled: true,
    }),
  });

  // 201 = created, 204 = existing contact updated / added to list
  if (response.status === 201 || response.status === 204) {
    return { ok: true };
  }

  return brevoError(response);
}

export function isBrevoEmailConfigured() {
  return getBrevoApiKey() !== null;
}

type TransactionalEmail = {
  to: { email: string; name?: string };
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
};

/** Send a transactional email. The sender must be verified under Brevo → Senders, Domains & Dedicated IPs. */
export async function sendBrevoEmail(email: TransactionalEmail): Promise<BrevoResult> {
  const apiKey = getBrevoApiKey();
  if (!apiKey) {
    return { ok: false, status: 0, message: "BREVO_API_KEY is not configured." };
  }

  const response = await fetch(BREVO_EMAIL_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_SENDER_NAME?.trim() || site.legalName,
        email: process.env.BREVO_SENDER_EMAIL?.trim() || site.email,
      },
      to: [email.to],
      replyTo: email.replyTo ? { email: email.replyTo } : undefined,
      subject: email.subject,
      htmlContent: email.html,
      textContent: email.text,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (response.status === 201) return { ok: true };

  return brevoError(response);
}
