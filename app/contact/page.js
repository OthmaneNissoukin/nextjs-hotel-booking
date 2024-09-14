import Banner from "../_components/Banner";
import Contact from "../_components/Contact";

export const metadata = {
  title: "Contact Us",
  description: "Reach out to the Hotel Booking App ",
};

async function Page() {
  return (
    <>
      <Banner title={"REACHING OUT"} />
      <Contact />
    </>
  );
}

export default Page;
