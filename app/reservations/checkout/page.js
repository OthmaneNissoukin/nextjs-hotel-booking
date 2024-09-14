import Banner from "@/app/_components/Banner";
import CheckoutForm from "./_components/CheckoutSection";

export const metadata = {
  title: "Reservation Checkout",
  description: "Checkout your reservation and let yourself have a good stay with us",
};

function Page() {
  return (
    <>
      <Banner title={"CHECKOUT"} />
      <CheckoutForm />
    </>
  );
}

export default Page;
