"use server";

import { z } from "zod";
import { addNewsletterSubscriber } from "@/lib/brevo";
import { brandedEmail, emailConfig, escapeHtml, getResend } from "@/lib/email";

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const emailSchema = z.email().max(200);

export async function subscribe(
  _prevState: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const raw = formData.get("email");
  const parsed = emailSchema.safeParse(typeof raw === "string" ? raw.trim() : "");
  if (!parsed.success) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const email = parsed.data;
  const result = await addNewsletterSubscriber(email);

  if (result.ok) {
    return { status: "success", message: "You're subscribed. Welcome." };
  }

  console.error("Failed to save Brevo subscriber", result);

  // Fallback: notify the team via Resend so the signup is not lost.
  const resend = getResend();
  if (resend) {
    const fallback = await resend.emails.send({
      from: emailConfig.from,
      to: emailConfig.to,
      subject: "[Website] New update subscriber",
      html: brandedEmail({
        heading: "New subscriber",
        body: `<p>${escapeHtml(email)} asked to receive teachings and gathering updates.</p>
<p style="font-size:13px;color:#6b7280;">Brevo save failed: ${escapeHtml(result.message)}</p>`,
      }),
    });
    if (!fallback.error) {
      return { status: "success", message: "You're subscribed. Welcome." };
    }
    console.error("Failed to send subscriber notification", fallback.error);
  }

  if (result.status === 0) {
    return {
      status: "error",
      message: "Subscriptions are temporarily unavailable. Please try again later.",
    };
  }

  return { status: "error", message: "Something went wrong. Please try again." };
}
