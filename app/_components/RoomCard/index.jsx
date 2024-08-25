import Image from "next/image";
import styles from "./styles.module.css";
import Card from "../Card/Card";

function RoomCard() {
  return (
    <Card>
      <Card.Thumbnail>
        <img src={"/room.png"} alt="" />
      </Card.Thumbnail>

      <Card.Description className={styles.roomDescription}>
        <h2>Bed Room</h2>

        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia voluptates amet atque.</p>
      </Card.Description>
    </Card>
  );
}

export default RoomCard;
