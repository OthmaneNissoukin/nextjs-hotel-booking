import Slider from "@/app/_components/Slider";
import styles from "./styles.module.css";

function RoomSlider({ images }) {
  console.log(images);
  return (
    <div className={styles.sliderContainer}>
      <Slider images={images} />
    </div>
  );
}

export default RoomSlider;
