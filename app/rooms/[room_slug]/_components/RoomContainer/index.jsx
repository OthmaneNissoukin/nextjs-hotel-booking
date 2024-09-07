import styles from "./styles.module.css";

import Heading from "@/app/_ui/Heading";
import Features from "../Features";
import RoomSlider from "../RoomSlider";
import RoomBookingForm from "../RoomBookingForm";
import RoomDescription from "../RoomDescription";
import Facilities from "../Facilities";
import BookingPolicy from "../BookingPolicy";
import { getRoomById, getRoomImages } from "@/app/_lib/supabase/rooms";
import { notFound } from "next/navigation";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;

async function RoomContainer({ params }) {
  const room = await getRoomById(params?.room_slug);
  const room_images = await getRoomImages(params?.room_slug ?? []);

  const images = room_images.map((item) => `${SUPABASE_ROOMS_URL}/${item.img_path}`);

  if (!room) notFound();
  return (
    <>
      <Heading className={styles.heading}>{room.name}</Heading>
      <Features room={room} />
      <RoomSlider images={images} />
      <RoomBookingForm room={room} />
      <RoomDescription />
      <Facilities />
      <BookingPolicy />
    </>
  );
}

export default RoomContainer;
