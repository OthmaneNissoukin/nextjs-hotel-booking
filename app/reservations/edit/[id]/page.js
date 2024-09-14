import Banner from "@/app/_components/Banner";
import EditSection from "./_components/EditSection";
import { notFound } from "next/navigation";
import { getReservationByID } from "@/app/_lib/supabase/reservations";
import { auth } from "@/auth";

export const metadata = {
  title: "Edit Reservation",
  description: "Edit your already booked reservation ",
};

async function Page({ params }) {
  const reservation_id = params?.id;

  const reservation = await getReservationByID(reservation_id);
  if (!reservation) notFound();

  const isUpdateAllowed = reservation.status === "confirmed" || reservation.status === "unconfirmed";

  if (!isUpdateAllowed) return <h4>Sorry, but reservation cannot be edited.</h4>;

  const session = await auth();

  if (session?.user.id !== reservation.guest_id)
    return (
      <div className="container">
        <h2>Unauthorized action!</h2>
      </div>
    );
  return (
    <>
      <Banner title={"EDIT RESERVATION"} />
      <EditSection reservation={reservation} />
    </>
  );
}

export default Page;
