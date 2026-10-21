export type SheetName = "Attendees" | "Volunteers";

export type SheetRow = Record<string, string | number>;

export type SheetResult =
  | { ok: true }
  | { ok: false; configured: boolean; message: string };

function getSheetsConfig() {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim();
  if (!url || !secret) return null;
  return { url, secret };
}

/**
 * Append a row to a tab in the CLAY registrations spreadsheet via the Apps Script
 * web app in `google-apps-script/clay-registrations.gs`. Keys become column headers.
 */
export async function appendSheetRow(sheet: SheetName, row: SheetRow): Promise<SheetResult> {
  const config = getSheetsConfig();
  if (!config) {
    return {
      ok: false,
      configured: false,
      message: "GOOGLE_SHEETS_WEBHOOK_URL or GOOGLE_SHEETS_WEBHOOK_SECRET is not configured.",
    };
  }

  try {
    const response = await fetch(config.url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ secret: config.secret, sheet, row }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });

    const body = await response.text();
    let data: { ok?: boolean; error?: string } = {};
    try {
      data = JSON.parse(body);
    } catch {
      // Apps Script returns an HTML page when the deployment is misconfigured.
    }

    if (response.ok && data.ok) return { ok: true };

    if (response.status === 401 || response.status === 403 || response.url.includes("accounts.google.com")) {
      return {
        ok: false,
        configured: true,
        message: `Sheets webhook denied access (${response.status}). Check the URL ends in /exec and the Apps Script deployment has "Who has access" set to "Anyone".`,
      };
    }

    return {
      ok: false,
      configured: true,
      message: data.error ?? `Sheets webhook returned ${response.status}: ${body.slice(0, 200)}`,
    };
  } catch (error) {
    return {
      ok: false,
      configured: true,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
