// Builds a plain-text .ics calendar file — the universal format Google
// Calendar, Apple Calendar, and Outlook all understand as an email
// attachment. No API keys or account connection needed for this to work.

function toIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function foldLine(line: string): string {
  // iCalendar lines longer than 75 octets should be folded, per RFC 5545.
  if (line.length <= 75) return line;
  const chunks: string[] = [];
  let rest = line;
  while (rest.length > 75) {
    chunks.push(rest.slice(0, 75));
    rest = " " + rest.slice(75);
  }
  chunks.push(rest);
  return chunks.join("\r\n");
}

export function buildAppointmentIcs(options: {
  uid: string;
  summary: string;
  description: string;
  location?: string;
  startsAt: Date;
  durationMinutes: number;
}): string {
  const { uid, summary, description, location, startsAt, durationMinutes } = options;
  const endsAt = new Date(startsAt.getTime() + durationMinutes * 60_000);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Lumiere//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(startsAt)}`,
    `DTEND:${toIcsDate(endsAt)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    location ? `LOCATION:${location}` : undefined,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter((line): line is string => Boolean(line));

  return lines.map(foldLine).join("\r\n");
}
