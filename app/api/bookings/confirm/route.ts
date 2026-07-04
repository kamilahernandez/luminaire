import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { sendConfirmationEmails } from "@/lib/email/resend";
import type { Client } from "@/lib/types/booking";

function htmlPage(title: string, message: string) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${title}</title>
<style>body{font-family:sans-serif;max-width:480px;margin:80px auto;text-align:center;color:#3a2f28;}</style>
</head><body><h1>${title}</h1><p>${message}</p></body></html>`;
}

export async function GET(request: NextRequest) {
  console.log("[api/bookings/confirm] GET start");

  try {
    const token = request.nextUrl.searchParams.get("token");
    if (!token) {
      console.log("[api/bookings/confirm] GET end — missing token");
      return new NextResponse(htmlPage("Missing link", "This confirmation link is incomplete."), {
        status: 400,
        headers: { "Content-Type": "text/html" },
      });
    }

    const supabase = getSupabaseServerClient();

    const { data: booking, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("confirm_token", token)
      .single();

    if (error || !booking) {
      console.log("[api/bookings/confirm] GET end — booking not found");
      return new NextResponse(htmlPage("Link not found", "This link is invalid."), {
        status: 404,
        headers: { "Content-Type": "text/html" },
      });
    }

    if (booking.status !== "pending") {
      console.log("[api/bookings/confirm] GET end — already actioned");
      return new NextResponse(
        htmlPage("Already handled", `This booking was already marked "${booking.status}".`),
        { headers: { "Content-Type": "text/html" } }
      );
    }

    const { data: updated, error: updateError } = await supabase
      .from("bookings")
      .update({ status: "confirmed" })
      .eq("id", booking.id)
      .select("*")
      .single();

    if (updateError || !updated) {
      console.error("[api/bookings/confirm] update failed", updateError);
      console.log("[api/bookings/confirm] GET end — update failed");
      return new NextResponse(htmlPage("Something went wrong", "Could not confirm this booking."), {
        status: 500,
        headers: { "Content-Type": "text/html" },
      });
    }

    const { data: client } = await supabase
      .from("clients")
      .select("*")
      .eq("id", updated.client_id)
      .single();

    await sendConfirmationEmails(updated, client as Client);

    console.log("[api/bookings/confirm] GET end — confirmed", updated.id);
    return new NextResponse(
      htmlPage(
        "Booking confirmed",
        `${updated.customer_name}'s appointment is confirmed. Confirmation emails with a calendar invite have been sent to both of you.`
      ),
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    console.error("[api/bookings/confirm] unexpected error", err);
    console.log("[api/bookings/confirm] GET end — error");
    return new NextResponse(htmlPage("Something went wrong", "Please try again in a moment."), {
      status: 500,
      headers: { "Content-Type": "text/html" },
    });
  }
}
