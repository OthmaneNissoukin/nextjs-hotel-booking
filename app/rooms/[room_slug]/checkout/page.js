import { redirect } from "next/navigation";
import Banner from "./_components/Banner";
import CheckoutForm from "./_components/CheckoutSection";

function Page() {
  return (
    <>
      <Banner title={"CHECKOUT"} />
      <CheckoutForm />
    </>
  );
}

export default Page;
