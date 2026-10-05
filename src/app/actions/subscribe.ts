"use server";

import { z } from "zod";
import { emailConfig, escapeHtml, getResend, brandedEmail } from "@/lib/email";

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

  const resend = getResend();
  if (!resend) {
    console.error("RESEND_API_KEY is not set; subscription could not be saved.");
    return {
      status: "error",
      message: "Subscriptions are temporarily unavailable. Please try again later.",
    };
  }

  const email = parsed.data;
  const { error } = await resend.contacts.create({
    email,
    unsubscribed: false,
    ...(emailConfig.segmentId ? { segments: [{ id: emailConfig.segmentId }] } : {}),
  });

  if (error) {
    console.error("Failed to save subscriber, notifying the team instead", error);
    const fallback = await resend.emails.send({
      from: emailConfig.from,
      to: emailConfig.to,
      subject: "[Website] New update subscriber",
      html: brandedEmail({
        heading: "New subscriber",
        body: `<p>${escapeHtml(email)} asked to receive teachings and gathering updates.</p>`,
      }),
    });
    if (fallback.error) {
      console.error("Failed to send subscriber notification", fallback.error);
      return { status: "error", message: "Something went wrong. Please try again." };
    }
  }

  return { status: "success", message: "You're subscribed. Welcome." };
}
