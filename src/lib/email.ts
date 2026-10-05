import { Resend } from "resend";
import { site } from "./site";

let client: Resend | null = null;

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  client ??= new Resend(apiKey);
  return client;
}

export const emailConfig = {
  from: process.env.CONTACT_FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`,
  to: process.env.CONTACT_TO_EMAIL ?? site.email,
  segmentId: process.env.RESEND_SEGMENT_ID,
};

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function brandedEmail({ heading, body }: { heading: string; body: string }) {
  return `<!doctype html>
<html>
  <body style="margin:0;background:#fdf8ec;font-family:Georgia,'Times New Roman',serif;color:#14161c;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fdf8ec;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-top:4px solid #9e2b2b;">
            <tr>
              <td style="padding:32px 32px 8px;font-family:Arial,sans-serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#9e2b2b;font-weight:bold;">
                ${escapeHtml(site.legalName)}
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px;font-size:28px;line-height:1.2;font-weight:600;">${heading}</td>
            </tr>
            <tr>
              <td style="padding:20px 32px 32px;font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#333e50;">${body}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
