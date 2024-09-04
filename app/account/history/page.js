import styles from "./style.module.css";
import Heading from "@/app/_ui/Heading";
import ReservationCard from "./_components/ReservationCard";

function History() {
  return (
    <>
      <Heading textClassName={styles.heading}>Your History</Heading>
      <div>
        {[1, 2, 3, 4].map((item, key) => (
          <ReservationCard
            thumbnailPath="/bg.png"
            title="King Room"
            date="20-08-2024 / 04-09-2024"
            status={"finished"}
            guestsCount={4}
            price={"$465"}
          />
        ))}
      </div>
    </>
  );
}

export default History;
