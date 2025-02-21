import Banner from "../_components/Banner";
import ContactSection from "../_components/ContactSection";

export const metadata = {
  title: "Contact Us",
  description: "Reach out to the Hotel Booking App ",
};

async function Page() {
  return (
    <>
      <Banner title={"REACHING OUT"} />
      <ContactSection />
    </>
  );
}

export default Page;
