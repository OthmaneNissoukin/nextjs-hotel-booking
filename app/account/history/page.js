import styles from "./style.module.css";
import Heading from "@/app/_ui/Heading";
import ReservationCard from "./_components/ReservationCard";
import { getGuestReservations } from "@/app/_lib/supabase/reservations";
import { auth } from "@/auth";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function History() {
  const reservations_cookies = cookies();
  const has_pernding_reservation = reservations_cookies.has("pending_reservation");

  if (has_pernding_reservation) {
    redirect("/reservations/checkout");
  }

  let session = {};
  let reservations = [];
  try {
    session = await auth();
    reservations = (await getGuestReservations(session.user?.id)) ?? [];
  } catch (err) {
    console.log(err);
  }

  return (
    <>
      <Heading textClassName={styles.heading}>Your History</Heading>
      <div>
        {reservations.length ? (
          reservations.map((item) => (
            <ReservationCard
              key={item.id}
              thumbnailPath={item.rooms.thumbnail}
              title={item.rooms.name}
              date={`${item.start_date} / ${item.end_date}`}
              status={`${item.status}`}
              guestsCount={`${item.guests_count}`}
              price={`$${item.reserved_price}`}
            />
          ))
        ) : (
          <div>
            <p>You have no booked room.</p>
            <Link href={"/rooms"}>View Rooms</Link>
          </div>
        )}
      </div>
    </>
  );
}

export default History;
