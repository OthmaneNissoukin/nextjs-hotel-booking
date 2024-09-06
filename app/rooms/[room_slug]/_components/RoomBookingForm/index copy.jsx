import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
import { faBed, faCalendar, faUsers } from "@fortawesome/free-solid-svg-icons";

function RoomBookingForm() {
  return (
    <form className={styles.roomBookingForm}>
      <div className={styles.formItem}>
        <div className={styles.formIcon}>
          <FontAwesomeIcon icon={faBed} />
        </div>
        <div className={styles.formControl}>
          <label>Room Type</label>
          <input type="text" value={"King Room"} readOnly disabled />
        </div>
      </div>
      <div className={styles.formItem}>
        <div className={styles.formIcon}>
          <FontAwesomeIcon icon={faCalendar} />
        </div>
        <div className={styles.formControl}>
          <label>Check In</label>
          <input type="date" />
        </div>
      </div>
      <div className={styles.formItem}>
        <div className={styles.formIcon}>
          <FontAwesomeIcon icon={faCalendar} />
        </div>
        <div className={styles.formControl}>
          <label>Check Out</label>
          <input type="date" />
        </div>
      </div>
      <div className={styles.formItem}>
        <div className={styles.formIcon}>
          <FontAwesomeIcon icon={faUsers} />
        </div>
        <div className={styles.formControl}>
          <label>Guests</label>
          <input type="number" min={1} value={3} max={12} />
        </div>
      </div>
      <div className={styles.formItem}>
        <button className={styles.formButton}>Book Now</button>
      </div>
    </form>
  );
}

export default RoomBookingForm;
