import type { Booking, Client } from "@/lib/types/booking";
import { STUDIO } from "@/lib/data/studio";

// Lumière brand tokens (from app/globals.css), hardcoded as hex — email
// clients don't support CSS custom properties.
const COLOR = {
  pageBg: "#faf6ef",
  cardBg: "#2a2018",
  headerBg: "#3a2e26",
  divider: "#4a3f37",
  cream100: "#faf6ef",
  cream200: "#f5eee2",
  mocha300: "#b9aea0",
  mocha400: "#9c9084",
  gold300: "#e6d3b3",
  gold500: "#c9a87c",
  gold600: "#b8946a",
  gold700: "#9a7b4f",
};

function formatDateLong(date: Date, timeZone: string) {
  return date.toLocaleDateString("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTimeRange(start: Date, durationMinutes: number, timeZone: string) {
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  const opts: Intl.DateTimeFormatOptions = { timeZone, hour: "numeric", minute: "2-digit" };
  return `${start.toLocaleTimeString("en-US", opts)} – ${end.toLocaleTimeString("en-US", opts)}`;
}

function fieldBlock(label: string, value: string, isLast = false) {
  return `
    <tr>
      <td style="padding: 0 0 ${isLast ? "0" : "16px"} 0; ${isLast ? "" : `border-bottom: 1px solid ${COLOR.divider};`} padding-bottom: 14px;">
        <div style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing: 0.6px; text-transform: uppercase; color: ${COLOR.mocha400}; margin-bottom: 5px;">
          ${label}
        </div>
        <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 16px; color: ${COLOR.cream100}; font-weight: 500;">
          ${value}
        </div>
      </td>
    </tr>
    ${isLast ? "" : `<tr><td style="height: 14px; line-height: 14px; font-size: 0;">&nbsp;</td></tr>`}
  `;
}

function sectionLabel(text: string) {
  return `
    <div style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${COLOR.gold500}; font-weight: 700; margin-bottom: 16px;">
      ${text}
    </div>
  `;
}

function pill(text: string, { bg, color }: { bg: string; color: string }) {
  return `<span style="display: inline-block; padding: 5px 13px; border-radius: 999px; background: ${bg}; color: ${color}; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 600; margin: 0 6px 6px 0;">${text}</span>`;
}

export function buildBookingRequestEmailHtml(options: {
  booking: Booking;
  client: Client;
  isReturningClient: boolean;
  confirmUrl: string;
  declineUrl: string;
}) {
  const { booking, client, isReturningClient, confirmUrl, declineUrl } = options;
  const appointmentDate = new Date(booking.appointment_at);
  const dateRequested = formatDateLong(appointmentDate, client.timezone);
  const timeRange = formatTimeRange(appointmentDate, booking.duration_minutes, client.timezone);
  const smsHref = `sms:${booking.customer_phone.replace(/[^\d+]/g, "")}`;
  const submitted = new Date(booking.created_at).toLocaleString("en-US", {
    timeZone: client.timezone,
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return `
<!doctype html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin: 0; padding: 0; background: ${COLOR.pageBg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: ${COLOR.pageBg};">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; background: ${COLOR.cardBg}; border-radius: 20px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: ${COLOR.headerBg}; border-bottom: 1px solid ${COLOR.divider}; padding: 22px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" valign="middle">
                    <span style="font-family: Georgia, 'Times New Roman', serif; font-size: 20px; letter-spacing: 2px; color: ${COLOR.gold300}; font-weight: 600;">LUMIÈRE</span><br/>
                    <span style="font-family: Helvetica, Arial, sans-serif; font-size: 10px; letter-spacing: 1.5px; color: ${COLOR.gold500}; text-transform: uppercase;">Lash &amp; Beauty Studio</span>
                  </td>
                  <td align="right" valign="middle">
                    <span style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; letter-spacing: 1.5px; color: ${COLOR.gold500}; text-transform: uppercase; font-weight: 700;">New Booking</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 22px; line-height: 1.35; color: ${COLOR.cream100}; font-weight: 600;">
                You&rsquo;ve received a new appointment request
              </div>
              <div style="font-family: Helvetica, Arial, sans-serif; font-size: 14px; color: ${COLOR.mocha300}; margin-top: 6px;">
                From ${booking.customer_name}
              </div>

              <div style="height: 1px; background: ${COLOR.divider}; margin: 26px 0;"></div>

              ${sectionLabel("Client Details")}
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${fieldBlock("Name", booking.customer_name)}
                ${fieldBlock("Phone", booking.customer_phone)}
                ${fieldBlock("Email", booking.customer_email)}
                ${fieldBlock(
                  "New or Returning Client",
                  isReturningClient
                    ? pill("Returning Client", { bg: COLOR.gold300, color: COLOR.cardBg })
                    : pill("New Client", { bg: COLOR.divider, color: COLOR.cream200 }),
                  true
                )}
              </table>

              <div style="height: 1px; background: ${COLOR.divider}; margin: 26px 0;"></div>

              ${sectionLabel("Appointment Details")}
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${fieldBlock("Service", booking.service)}
                ${fieldBlock("Date Requested", dateRequested)}
                ${fieldBlock("Preferred Time", timeRange)}
                ${fieldBlock("Duration", `${booking.duration_minutes} minutes`, true)}
              </table>

              ${
                booking.add_on_services.length > 0
                  ? `
                <div style="height: 1px; background: ${COLOR.divider}; margin: 26px 0;"></div>
                ${sectionLabel("Additional Services")}
                <div>${booking.add_on_services
                  .map((s) => pill(s, { bg: COLOR.headerBg, color: COLOR.gold300 }))
                  .join("")}</div>
              `
                  : ""
              }

              ${
                booking.notes
                  ? `
                <div style="height: 1px; background: ${COLOR.divider}; margin: 26px 0;"></div>
                ${sectionLabel("Client Notes")}
                <div style="background: ${COLOR.headerBg}; border-left: 3px solid ${COLOR.gold600}; border-radius: 8px; padding: 16px 18px; font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size: 14px; line-height: 1.6; color: ${COLOR.cream200};">
                  &ldquo;${booking.notes}&rdquo;
                </div>
              `
                  : ""
              }

              <div style="height: 1px; background: ${COLOR.divider}; margin: 30px 0 26px 0;"></div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${confirmUrl}" style="display: inline-block; background: ${COLOR.gold600}; color: ${COLOR.cardBg}; font-family: Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 999px;">
                      Accept Appointment →
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 16px;">
                    <a href="${smsHref}" style="font-family: Helvetica, Arial, sans-serif; font-size: 13px; color: ${COLOR.gold500}; text-decoration: none; font-weight: 600;">Text ${booking.customer_name} →</a>
                    <span style="color: ${COLOR.divider}; padding: 0 10px;">|</span>
                    <a href="${declineUrl}" style="font-family: Helvetica, Arial, sans-serif; font-size: 13px; color: ${COLOR.mocha300}; text-decoration: none;">Decline</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 18px 32px; border-top: 1px solid ${COLOR.divider};">
              <div style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; color: ${COLOR.mocha400};">
                Submitted ${submitted}
              </div>
            </td>
          </tr>

        </table>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; margin-top: 18px;">
          <tr>
            <td align="center" style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; color: #9c9084;">
              ${client.name} · ${STUDIO.address} · ${STUDIO.phone}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
