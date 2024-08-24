import BookingButton from "../BookingButton";
import styles from "./index.module.css";

function BookingForm({ children }) {
  return (
    <form className={styles.bookingForm}>
      <h1 className={styles.formHeading}>BOOK A ROOM ONLINE</h1>
      <div className={styles.formControl}>
        <label htmlFor="" className={styles.formLabel}>
          Arrival
        </label>
        <input type="date" name="" id="" className={styles.input} />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="" className={styles.formLabel}>
          Departure
        </label>
        <input type="date" name="" id="" className={styles.input} />
      </div>

      <div className={styles.actions}>
        <BookingButton />
        <div>{children}</div>
      </div>
    </form>
  );
}

export default BookingForm;
