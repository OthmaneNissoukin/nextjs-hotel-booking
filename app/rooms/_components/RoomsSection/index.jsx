import { filterRoomsByDate, getAllRooms } from "@/app/_lib/supabase/rooms";
import styles from "./styles.module.css";
import RoomItem from "../RoomItem";

async function RoomsSection({ filter, range }) {
  const rooms = await getAllRooms();

  await filterRoomsByDate();

  let filteredRooms = rooms;

  if (range) {
    // ADD REGEX CONDITION FOR DATE PATTERN
    filteredRooms = await filterRoomsByDate(range.split("_")?.at(0), range.split("_")?.at(1));
  }

  switch (filter) {
    case "high-price":
      filteredRooms = filteredRooms.sort((a, b) => b.price - a.price);
      break;
    case "low-price":
      filteredRooms = filteredRooms.sort((a, b) => a.price - b.price);
      break;

    case "min-guests":
      filteredRooms = filteredRooms.sort((a, b) => b.capacity - a.capacity);
      break;

    case "max-guests":
      filteredRooms = filteredRooms.sort((a, b) => a.capacity - b.capacity);
      break;
    default:
      filteredRooms = filteredRooms;
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
