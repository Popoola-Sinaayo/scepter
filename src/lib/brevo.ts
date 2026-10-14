const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

export type BrevoResult =
  | { ok: true }
  | { ok: false; status: number; message: string };

function getBrevoConfig() {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const listIdRaw = process.env.BREVO_LIST_ID?.trim();
  const listId = listIdRaw ? Number(listIdRaw) : NaN;

  if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
    return null;
  }

  return { apiKey, listId };
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

  let message = `Brevo returned ${response.status}`;
  try {
    const data = (await response.json()) as { message?: string };
    if (data.message) message = data.message;
  } catch {
    // ignore non-JSON error bodies
  }

  return { ok: false, status: response.status, message };
}
