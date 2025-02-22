import Stripe from "stripe";
import { getReservationByStripeSessionId } from "../_lib/supabase/reservations";
import { notFound, redirect } from "next/navigation";
import SuccessPage from "./_components/SuccessPage/SuccessPage";
import ExpirePage from "./_components/ExpirePage/ExpirePage";
import { auth } from "@/auth";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const metadata = {
  title: "Booking Overview",
};

export default async function PreviewPage({ searchParams }) {
  const session_id = searchParams?.session_id;
  // console.log({ session_id });

  if (!session_id)
    return (
      <div className="container">
        {" "}
        <h1>Forbidden</h1>
      </div>
    );

  const session = await auth();

  if (!session?.user) redirect("/signin");

  const reservation = await getReservationByStripeSessionId(session_id);

  if (!reservation?.id) return notFound();
  if (reservation.guest_id !== session.user.id) return notFound();

  const strip_session = await stripe.checkout.sessions.retrieve(session_id);

  if (
    strip_session.status === "expired" ||
    new Date() > new Date(strip_session.expires_at * 1000)
  )
    return <ExpirePage />;

  if (
    strip_session.status === "complete" &&
    strip_session.payment_status === "paid"
  ) {
    return <SuccessPage reservation={reservation} />;
  }

  if (
    strip_session.status === "open" &&
    strip_session.payment_status === "unpaid"
  ) {
    redirect("/reservations/checkout");
  }

  return <ExpirePage />;
}
