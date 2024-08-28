import Link from "next/link";
import Slider from "../_components/Slider";
import FilterSection from "./_components/FilterSection";

import styles from "./styles.module.css";
import RoomItem from "./_components/RoomItem";
function Rooms() {
  return (
    <>
      <Slider images={["/bg.png", "/bg.png", "/bg.png"]} />

      <div className={`container ${styles.roomsHolder}`}>
        <FilterSection />

        <div className={styles.roomsGrid}>
          <RoomItem price="300" imgPath="/bg.png" link="#" />
          <RoomItem price="300" imgPath="/bg.png" link="#" />
          <RoomItem price="300" imgPath="/bg.png" link="#" />
        </div>
      </div>
    </>
  );
}

export default Rooms;
