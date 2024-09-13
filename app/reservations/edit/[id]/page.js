import Banner from "@/app/_components/Banner";
import EditSection from "./_components/EditSection";

function Page({ params }) {
  const reservation_id = params?.id;
  return (
    <>
      <Banner title={"EDIT RESERVATION"} />
      <EditSection reservation_id={reservation_id} />
    </>
  );
}

export default Page;
