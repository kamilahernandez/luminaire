import type { Metadata } from "next";
import { BookingForm } from "@/components/booking/BookingForm";

export const metadata: Metadata = {
  title: "Book Your Appointment — Lumière",
  description: "Book your appointment at Lumière lash & beauty studio in Woburn, MA.",
};

export default function BookingPage() {
  return <BookingForm />;
}
