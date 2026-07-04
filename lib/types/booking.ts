export type BookingStatus = "pending" | "confirmed" | "declined";

export type Booking = {
  id: string;
  client_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service: string;
  add_on_services: string[];
  appointment_at: string;
  duration_minutes: number;
  notes: string | null;
  status: BookingStatus;
  confirm_token: string;
  reminder_sent_at: string | null;
  review_sent_at: string | null;
  created_at: string;
};

export type Client = {
  id: string;
  name: string;
  notification_email: string;
  timezone: string;
  review_link: string | null;
  created_at: string;
};
