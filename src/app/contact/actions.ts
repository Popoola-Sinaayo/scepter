"use server";

import { z } from "zod";
import { brandedEmail, emailConfig, escapeHtml, getResend } from "@/lib/email";
import { site } from "@/lib/site";

const enquiryTypes = ["General enquiry"] as const;

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email address.").max(200),
  enquiryType: z.enum(enquiryTypes).default("General enquiry"),
  subject: z.string().trim().max(160).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please write a little more (at least 10 characters).")
    .max(5000, "Please keep your message under 5,000 characters."),
});

type EnquiryField = "name" | "email" | "subject" | "message";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<EnquiryField, string[]>>;
  values?: Partial<Record<EnquiryField, string>>;
};

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function sendEnquiry(
  _prevState: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const values = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    subject: text(formData, "subject"),
    message: text(formData, "message"),
  };

  // Bots fill the hidden field; pretend success so they move on.
  if (text(formData, "company")) {
    return { status: "success" };
  }

  const parsed = enquirySchema.safeParse({
    ...values,
    enquiryType: text(formData, "enquiryType") || undefined,
    subject: values.subject || undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  const resend = getResend();
  if (!resend) {
    console.error("RESEND_API_KEY is not set; enquiry could not be sent.");
    return {
      status: "error",
      message: `Our enquiry form is temporarily unavailable. Please email us directly at ${site.email}.`,
      values,
    };
  }

  const { name, email, enquiryType, subject, message } = parsed.data;
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const title = subject ? `${enquiryType}: ${subject}` : enquiryType;

  const { error } = await resend.emails.send({
    from: emailConfig.from,
    to: emailConfig.to,
    replyTo: email,
    subject: `[Website] ${title} from ${name}`,
    html: brandedEmail({
      heading: "New website enquiry",
      body: `<p><strong>Name:</strong> ${escapeHtml(name)}<br />
<strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a><br />
<strong>Type:</strong> ${escapeHtml(enquiryType)}${subject ? `<br /><strong>Subject:</strong> ${escapeHtml(subject)}` : ""}</p>
<p style="padding:16px;background:#fcf0d6;">${safeMessage}</p>
<p style="font-size:13px;color:#6b7280;">Reply directly to this email to respond to ${escapeHtml(name)}.</p>`,
    }),
    text: `Name: ${name}\nEmail: ${email}\nType: ${enquiryType}\n${subject ? `Subject: ${subject}\n` : ""}\n${message}`,
  });

  if (error) {
    console.error("Failed to send enquiry", error);
    return {
      status: "error",
      message: `Something went wrong sending your message. Please try again, or email us at ${site.email}.`,
      values,
    };
  }

  const firstName = name.split(" ")[0];
  const ack = await resend.emails.send({
    from: emailConfig.from,
    to: email,
    replyTo: emailConfig.to,
    subject: `We received your message | ${site.name}`,
    html: brandedEmail({
      heading: `Thank you, ${escapeHtml(firstName)}.`,
      body: `<p>Your message has reached The Scepter team. We read every enquiry personally and will respond as soon as we can.</p>
<p style="padding:16px;background:#fcf0d6;font-style:italic;">${safeMessage}</p>
<p>Grace and peace,<br />The Scepter Christian Ministries</p>`,
    }),
    text: `Thank you, ${firstName}.\n\nYour message has reached The Scepter team. We read every enquiry personally and will respond as soon as we can.\n\nGrace and peace,\nThe Scepter Christian Ministries`,
  });

  if (ack.error) {
    console.error("Failed to send enquiry acknowledgement", ack.error);
  }

  return {
    status: "success",
    message: "Thank you. Your message has been sent, and a confirmation is on its way to your inbox.",
  };
}
