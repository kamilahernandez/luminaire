import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { sendReminderEmail, sendReviewRequestEmail } from "@/lib/email/resend";
import type { Client } from "@/lib/types/booking";

// Triggered on a schedule by Vercel Cron (see vercel.json). Protected by
// CRON_SECRET so only Vercel's scheduler can call it, not the open internet.
export async function GET(request: NextRequest) {
  console.log("[api/cron/reminders] GET start");

  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      console.log("[api/cron/reminders] GET end — unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseServerClient();
    const now = new Date();
    let remindersSent = 0;
    let reviewsSent = 0;

    const { data: clients } = await supabase.from("clients").select("*");
    const clientsById = new Map((clients ?? []).map((c) => [c.id, c as Client]));

    // 48-hour-out reminders: confirmed, not yet reminded, appointment within
    // the next 48 hours (and still in the future).
    const in48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000);
    const { data: dueForReminder } = await supabase
      .from("bookings")
      .select("*")
      .eq("status", "confirmed")
      .is("reminder_sent_at", null)
      .gt("appointment_at", now.toISOString())
      .lte("appointment_at", in48Hours.toISOString());

    for (const booking of dueForReminder ?? []) {
      const client = clientsById.get(booking.client_id);
      if (!client) continue;
      try {
        await sendReminderEmail(booking, client);
        await supabase.from("bookings").update({ reminder_sent_at: now.toISOString() }).eq("id", booking.id);
        remindersSent++;
      } catch (err) {
        console.error("[api/cron/reminders] reminder failed for booking", booking.id, err);
      }
    }

    // 1-hour-after review requests: confirmed, not yet requested, appointment
    // (start time) was at least 1 hour ago.
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const { data: dueForReview } = await supabase
      .from("bookings")
      .select("*")
      .eq("status", "confirmed")
      .is("review_sent_at", null)
      .lte("appointment_at", oneHourAgo.toISOString());

    for (const booking of dueForReview ?? []) {
      const client = clientsById.get(booking.client_id);
      if (!client) continue;
      try {
        await sendReviewRequestEmail(booking, client);
        await supabase.from("bookings").update({ review_sent_at: now.toISOString() }).eq("id", booking.id);
        reviewsSent++;
      } catch (err) {
        console.error("[api/cron/reminders] review request failed for booking", booking.id, err);
      }
    }

    console.log("[api/cron/reminders] GET end", { remindersSent, reviewsSent });
    return NextResponse.json({ remindersSent, reviewsSent });
  } catch (err) {
    console.error("[api/cron/reminders] unexpected error", err);
    console.log("[api/cron/reminders] GET end — error");
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
