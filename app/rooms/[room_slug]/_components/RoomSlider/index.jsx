import Slider from "@/app/_components/Slider";
import styles from "./styles.module.css";

function RoomSlider() {
  return (
    <div className={styles.sliderContainer}>
      <Slider images={["/bg.png", "/bg.png", "/bg.png"]} />
    </div>
  );
}

export default RoomSlider;
