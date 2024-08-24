import styles from "./styles.module.css";

function BookingButton({ onClick = null }) {
  return (
    <button type="button" onClick={onClick ?? onClick} className={styles.bookingBtn}>
      Book Now
    </button>
  );
}
export default BookingButton;
