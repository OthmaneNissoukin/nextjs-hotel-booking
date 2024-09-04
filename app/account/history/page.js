import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./style.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Heading from "@/app/_ui/Heading";

function History() {
  return (
    <>
      <Heading textClassName={styles.heading}>Your History</Heading>
      <div>
        <article className={styles.reservationItem}>
          <div className={styles.reservationThumbnail}>
            <img src="/bg.png" />
          </div>

          <div className={styles.reservationInfos}>
            <div className={styles.reservationOverview}>
              <h2>King Room</h2>
              <p>4 Guests</p>
              <p>20-08-2024 / 04-09-2024</p>
            </div>
            <div className={styles.reservationPriceContainer}>
              <p>$465.00</p>
              <button>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

export default History;
