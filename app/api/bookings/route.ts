import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { sendBookingRequestToStudio } from "@/lib/email/resend";
import type { Client } from "@/lib/types/booking";

const APPOINTMENT_TIMEZONE = "America/New_York";

// Converts a wall-clock date/time in a given timezone to the correct UTC
// instant, accounting for daylight saving (America/New_York is UTC-5 in
// winter, UTC-4 in summer — a fixed offset would be wrong half the year).
function zonedTimeToUtc(year: number, month: number, day: number, hour: number, minute: number, timeZone: string): Date {
  const naiveUtc = Date.UTC(year, month - 1, day, hour, minute);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = formatter.formatToParts(new Date(naiveUtc)).reduce<Record<string, string>>((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});
  const asIfUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) === 24 ? 0 : Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  const offset = asIfUtc - naiveUtc;
  return new Date(naiveUtc - offset);
}

// Combines a "YYYY-MM-DD" date and a "h:mm AM/PM" time (both entered in the
// studio's local timezone) into a real UTC instant for storage.
function toAppointmentDate(dateStr: string, timeStr: string): Date {
  const [, hourStr, minuteStr, meridiem] =
    timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i) ?? [];
  let hour = parseInt(hourStr, 10) % 12;
  if (/pm/i.test(meridiem)) hour += 12;

  const [year, month, day] = dateStr.split("-").map(Number);
  return zonedTimeToUtc(year, month, day, hour, parseInt(minuteStr, 10), APPOINTMENT_TIMEZONE);
}

export async function POST(request: NextRequest) {
  console.log("[api/bookings] POST start");

  try {
    const body = await request.json();
    const { name, email, phone, service, addOns, date, time, notes } = body;

    if (!name || !email || !phone || !service || !date || !time) {
      console.log("[api/bookings] POST end — missing fields");
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("*")
      .eq("name", "Lumière")
      .single();

    if (clientError || !client) {
      console.error("[api/bookings] client lookup failed", clientError);
      console.log("[api/bookings] POST end — client not found");
      return NextResponse.json({ error: "Studio not found." }, { status: 500 });
    }

    const appointmentAt = toAppointmentDate(date, time);

    // Returning if this email has a past confirmed booking with this studio.
    const { count: pastConfirmedCount } = await supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("client_id", client.id)
      .eq("customer_email", email)
      .eq("status", "confirmed");
    const isReturningClient = (pastConfirmedCount ?? 0) > 0;

    const { data: booking, error: insertError } = await supabase
      .from("bookings")
      .insert({
        client_id: client.id,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        service,
        add_on_services: Array.isArray(addOns) ? addOns : [],
        appointment_at: appointmentAt.toISOString(),
        notes: notes || null,
      })
      .select("*")
      .single();

    if (insertError || !booking) {
      console.error("[api/bookings] insert failed", insertError);
      console.log("[api/bookings] POST end — insert failed");
      return NextResponse.json({ error: "Could not save booking." }, { status: 500 });
    }

    await sendBookingRequestToStudio(booking, client as Client, isReturningClient);

    console.log("[api/bookings] POST end — booking created", booking.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/bookings] unexpected error", err);
    console.log("[api/bookings] POST end — error");
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
