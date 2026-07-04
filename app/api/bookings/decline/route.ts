import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

function htmlPage(title: string, message: string) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${title}</title>
<style>body{font-family:sans-serif;max-width:480px;margin:80px auto;text-align:center;color:#3a2f28;}</style>
</head><body><h1>${title}</h1><p>${message}</p></body></html>`;
}

export async function GET(request: NextRequest) {
  console.log("[api/bookings/decline] GET start");

  try {
    const token = request.nextUrl.searchParams.get("token");
    if (!token) {
      console.log("[api/bookings/decline] GET end — missing token");
      return new NextResponse(htmlPage("Missing link", "This decline link is incomplete."), {
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
      console.log("[api/bookings/decline] GET end — booking not found");
      return new NextResponse(htmlPage("Link not found", "This link is invalid."), {
        status: 404,
        headers: { "Content-Type": "text/html" },
      });
    }

    if (booking.status !== "pending") {
      console.log("[api/bookings/decline] GET end — already actioned");
      return new NextResponse(
        htmlPage("Already handled", `This booking was already marked "${booking.status}".`),
        { headers: { "Content-Type": "text/html" } }
      );
    }

    const { error: updateError } = await supabase
      .from("bookings")
      .update({ status: "declined" })
      .eq("id", booking.id);

    if (updateError) {
      console.error("[api/bookings/decline] update failed", updateError);
      console.log("[api/bookings/decline] GET end — update failed");
      return new NextResponse(htmlPage("Something went wrong", "Could not decline this booking."), {
        status: 500,
        headers: { "Content-Type": "text/html" },
      });
    }

    console.log("[api/bookings/decline] GET end — declined", booking.id);
    return new NextResponse(
      htmlPage(
        "Booking declined",
        `${booking.customer_name}'s request has been declined. No email was sent to them automatically — reach out directly if you'd like to offer another time.`
      ),
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    console.error("[api/bookings/decline] unexpected error", err);
    console.log("[api/bookings/decline] GET end — error");
    return new NextResponse(htmlPage("Something went wrong", "Please try again in a moment."), {
      status: 500,
      headers: { "Content-Type": "text/html" },
    });
  }
}
