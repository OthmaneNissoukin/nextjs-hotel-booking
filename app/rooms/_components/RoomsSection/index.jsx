import { getAllRooms } from "@/app/_lib/supabase/rooms";
import styles from "./styles.module.css";
import RoomItem from "../RoomItem";

async function RoomsSection({ filter }) {
  const rooms = await getAllRooms();

  let filteredRooms = rooms;

  switch (filter) {
    case "high-price":
      filteredRooms = rooms.sort((a, b) => b.price - a.price);
      break;
    case "low-price":
      filteredRooms = rooms.sort((a, b) => a.price - b.price);
      break;

    case "min-guests":
      filteredRooms = rooms.sort((a, b) => b.capacity - a.capacity);
      break;

    case "max-guests":
      filteredRooms = rooms.sort((a, b) => a.capacity - b.capacity);
      break;
    default:
      filteredRooms = rooms;
  }

  console.log(filteredRooms);
  return (
    <div className={styles.roomsGrid}>
      {filteredRooms.map((item) => (
        <RoomItem key={item.id} id={item.id} title={item.name} price={item.price} imgPath={item.thumbnail} link="#" />
      ))}
    </div>
  );
}

export default RoomsSection;
