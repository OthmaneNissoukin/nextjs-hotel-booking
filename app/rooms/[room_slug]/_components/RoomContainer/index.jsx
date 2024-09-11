import styles from "./styles.module.css";

import Heading from "@/app/_ui/Heading";
import Features from "../Features";
import RoomSlider from "../RoomSlider";
import RoomBookingForm from "../RoomBookingForm";
import RoomDescription from "../RoomDescription";
import Facilities from "../Facilities";
import BookingPolicy from "../BookingPolicy";
import { getRoomById, getRoomImages } from "@/app/_lib/supabase/rooms";
import { notFound, redirect } from "next/navigation";
import { bookingSchema } from "@/app/_lib/zodSchemas";
import { cookies } from "next/headers";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;

async function RoomContainer({ params }) {
  const room = await getRoomById(params?.room_slug);
  const room_images = await getRoomImages(params?.room_slug ?? []);

  const images = room_images.map((item) => `${SUPABASE_ROOMS_URL}/${item.img_path}`);

  if (!room) notFound();

  async function bookingAction(prevState, formData) {
    "use server";

    prevState = { ...prevState, isBooking: true };
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");
    const guests_count = parseInt(formData.get("guests_count"));
    const room_id = formData.get("room_id");

    // FORM VALIDATION
    let isValid = true;
    try {
      bookingSchema.parse({ start_date, end_date, guests_count });
    } catch (err) {
      isValid = false;
      err.errors.forEach((element) => {
        prevState[element?.path[0] ?? "unknown"] = element.message;
      });

      return { ...prevState, isBooking: false };
    } finally {
      prevState = { ...prevState, isBooking: false };
    }

    if (isValid) {
      const reservation_cookies = cookies();
      reservation_cookies.set("pending_reservation", JSON.stringify({ start_date, end_date, guests_count, room_id }));

      redirect(`/reservations/checkout`);
    }
  }

  return (
    <>
      <Heading className={styles.heading}>{room.name}</Heading>
      <Features room={room} />
      <RoomSlider images={images} />
      <RoomBookingForm bookingAction={bookingAction} room={room} />
      <RoomDescription />
      <Facilities />
      <BookingPolicy />
    </>
  );
}

export default RoomContainer;
