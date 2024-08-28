import styles from "./styles.module.css";

function RoomItem({ imgPath, price, link }) {
  return (
    <div className={styles.roomsGrid}>
      <div className={styles.roomItem}>
        <div className={styles.imgOverlay}>
          <img src={imgPath ?? "/bg.png"} alt="" />
        </div>
        <div className={styles.roomDescription}>
          <div>
            <h2>Room King</h2>
            <a href={link ?? "#"}>From {price} / Night</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomItem;
