import { Resend } from "resend";
import { buildAppointmentIcs } from "./ics";
import { buildBookingRequestEmailHtml } from "./templates/booking-request";
import type { Booking, Client } from "@/lib/types/booking";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY in .env.local.");
  }
  return new Resend(apiKey);
}

function getFromAddress() {
  return process.env.RESEND_FROM_EMAIL ?? "Lumière Bookings <onboarding@resend.dev>";
}

function getSiteUrl() {
  const siteUrl = process.env.SITE_URL;
  if (!siteUrl) {
    throw new Error("Missing SITE_URL in .env.local.");
  }
  return siteUrl;
}

// The Resend SDK does not throw on API-level failures — it returns
// { data, error }. Without checking `error`, a rejected send (e.g. Resend's
// sandbox restriction on which recipients you can send to) looks identical
// to success. This wrapper makes failures surface like every other error.
async function sendOrThrow(resend: Resend, payload: Parameters<Resend["emails"]["send"]>[0]) {
  const { data, error } = await resend.emails.send(payload);
  if (error) {
    throw new Error(`Resend send failed (to: ${payload.to}): ${error.message}`);
  }
  return data;
}

function formatAppointmentTime(booking: Booking, timezone: string) {
  return new Date(booking.appointment_at).toLocaleString("en-US", {
    timeZone: timezone,
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export async function sendBookingRequestToStudio(booking: Booking, client: Client, isReturningClient: boolean) {
  const resend = getResendClient();
  const siteUrl = getSiteUrl();
  const confirmUrl = `${siteUrl}/api/bookings/confirm?token=${booking.confirm_token}`;
  const declineUrl = `${siteUrl}/api/bookings/decline?token=${booking.confirm_token}`;

  await sendOrThrow(resend, {
    from: getFromAddress(),
    to: client.notification_email,
    subject: `New booking request — ${booking.customer_name}`,
    html: buildBookingRequestEmailHtml({ booking, client, isReturningClient, confirmUrl, declineUrl }),
  });
}

export async function sendConfirmationEmails(booking: Booking, client: Client) {
  const resend = getResendClient();
  const when = formatAppointmentTime(booking, client.timezone);
  const ics = buildAppointmentIcs({
    uid: `${booking.id}@lumiere-booking`,
    summary: `${booking.service} — ${client.name}`,
    description: `Appointment for ${booking.customer_name} (${booking.customer_phone})`,
    startsAt: new Date(booking.appointment_at),
    durationMinutes: booking.duration_minutes,
  });
  const attachments = [
    {
      filename: "appointment.ics",
      content: Buffer.from(ics).toString("base64"),
    },
  ];

  await sendOrThrow(resend, {
    from: getFromAddress(),
    to: booking.customer_email,
    subject: `Your appointment is confirmed — ${when}`,
    html: `
      <h2>You're all set, ${booking.customer_name}!</h2>
      <p>Your <strong>${booking.service}</strong> appointment is confirmed for <strong>${when}</strong>.</p>
      <p>A calendar invite is attached — open it to add this to Google Calendar, Apple Calendar, or Outlook.</p>
    `,
    attachments,
  });

  await sendOrThrow(resend, {
    from: getFromAddress(),
    to: client.notification_email,
    subject: `Confirmed — ${booking.customer_name}, ${when}`,
    html: `
      <h2>Booking confirmed</h2>
      <p><strong>${booking.customer_name}</strong> — <strong>${booking.service}</strong> — <strong>${when}</strong>.</p>
      <p>Calendar invite attached.</p>
    `,
    attachments,
  });
}

export async function sendReminderEmail(booking: Booking, client: Client) {
  const resend = getResendClient();
  const when = formatAppointmentTime(booking, client.timezone);

  await sendOrThrow(resend, {
    from: getFromAddress(),
    to: booking.customer_email,
    subject: `Reminder: your appointment is in 2 days`,
    html: `
      <h2>See you soon, ${booking.customer_name}!</h2>
      <p>This is a reminder that your <strong>${booking.service}</strong> appointment is coming up on <strong>${when}</strong>.</p>
    `,
  });
}

export async function sendReviewRequestEmail(booking: Booking, client: Client) {
  const resend = getResendClient();
  const reviewLink = client.review_link ?? "#";

  await sendOrThrow(resend, {
    from: getFromAddress(),
    to: booking.customer_email,
    subject: `How was your visit?`,
    html: `
      <h2>Thank you for visiting ${client.name}, ${booking.customer_name}!</h2>
      <p>We'd love to hear about your experience. Would you mind leaving us a quick review?</p>
      <p><a href="${reviewLink}" style="background:#a97142;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;">Leave a review</a></p>
    `,
  });
}
