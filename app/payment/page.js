import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
export default async function PreviewPage({ searchParams }) {
  // TODO: ACCESS SEARCH PARAMS FOR THE NEW METHOD

  const session_id = searchParams?.session_id;
  console.log({ session_id });

  if (!session_id) return <h1>Forbidden</h1>;

  const strip_session = await stripe.checkout.sessions.retrieve(session_id);
  // const customer = await stripe.customers.retrieve(strip_session.customer);

  console.log({ strip_session });

  if (strip_session.status === "expired" || new Date() > new Date(strip_session.expires_at)) return <h1>Expired</h1>;

  if (strip_session.status === "complete" && strip_session.payment_status === "paid") {
    return <h1>Thank you for your booking</h1>;
  }

  if (strip_session.status === "open" && strip_session.payment_status === "unpaid") {
    return <h1>Redirect to confirmation page</h1>;
  }

  // if (strip_session.status = "open" && strip_session.payment_status === "")

  return (
    <>
      <Banner title={"CHECKOUT"} />
      <CheckoutForm />
    </>
  );
}
