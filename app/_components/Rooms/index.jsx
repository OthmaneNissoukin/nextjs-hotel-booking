import Heading from "@/app/_ui/Heading";

import styles from "./styles.module.css";
import RoomCard from "../RoomCard";

function Rooms() {
  return (
    <section className={styles.roomsSection}>
      <div className="container">
        <Heading className="text-center">Our Rooms</Heading>
        <p className="text-center">Lorem Ipsum is available, but the majority have suffered</p>
        <div className={styles.roomsGrid}>
          {[1, 2, 1, 1, 1, 2].map((item, index) => (
            <RoomCard key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Rooms;
