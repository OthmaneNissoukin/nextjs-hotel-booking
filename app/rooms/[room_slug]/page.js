import styles from "./styles.module.css";
import RoomBookingForm from "./_components/RoomBookingForm";
import Features from "./_components/Features";
import RoomSlider from "./_components/RoomSlider";
import RoomDescription from "./_components/RoomDescription";
import Facilities from "./_components/Facilities";
import Heading from "@/app/_ui/Heading";
import fa_styles from "@fortawesome/fontawesome-svg-core/styles.css";
import BookingPolicy from "./_components/BookingPolicy";

function RoomDetails({ params }) {
  console.log(params);
  return (
    <section className="container">
      <Heading className={styles.heading}>King Room</Heading>
      <Features />
      <RoomSlider />
      <RoomBookingForm />
      <RoomDescription />
      <Facilities />
      <BookingPolicy />
    </section>
  );
}

export default RoomDetails;
