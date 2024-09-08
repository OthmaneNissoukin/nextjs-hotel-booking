import styles from "./style.module.css";
import Heading from "@/app/_ui/Heading";
import ReservationCard from "./_components/ReservationCard";
import { getGuestReservations } from "@/app/_lib/supabase/reservations";

async function History() {
  // TODO: GET THE ID FROM THE CURRENT AUTHENTICATED GUEST
  const reservations = await getGuestReservations(1);

  return (
    <>
      <Heading textClassName={styles.heading}>Your History</Heading>
      <div>
        {reservations.map((item) => (
          <ReservationCard
            key={item.id}
            thumbnailPath={item.rooms.thumbnail}
            title={item.rooms.name}
            date={`${item.start_date} / ${item.end_date}`}
            status={`${item.status}`}
            guestsCount={`${item.guests_count}`}
            price={`$${item.reserved_price}`}
          />
        ))}
      </div>
    </>
  );
}

export default History;
