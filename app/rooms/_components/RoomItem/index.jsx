import Image from "next/image";
import styles from "./styles.module.css";

function RoomItem({ imgPath, price, link, title }) {
  return (
    <div className={styles.roomsGrid}>
      <div className={styles.roomItem}>
        <div className={styles.imgOverlay}>
          <Image fill src={imgPath ?? "/bg.png"} alt="" />
        </div>
        <div className={styles.roomDescription}>
          <div>
            <h2 className={styles.roomTitle}>{title}</h2>
            <a href={link ?? "#"}>From ${price} / Night</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomItem;
