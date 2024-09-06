"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
import { faBed, faCalendar, faInfo, faInfoCircle, faUsers } from "@fortawesome/free-solid-svg-icons";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

function RoomBookingForm() {
  return (
    <form className={styles.roomBookingForm}>
      <div className={styles.datepicker}>
        <div>
          <DayPicker
            captionLayout="dropdown"
            min={0}
            mode="range"
            startMonth={new Date(2024, 0)}
            endMonth={new Date(2027, 11)}
            weekStartsOn={1}
            numberOfMonths={2}
            disabled={[{ before: new Date() }]}
            footer={
              <p>
                <span className={styles.footerIcon}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </span>
                <span>Please Pick a Range</span>
              </p>
            }
            classNames={{
              today: styles.datepickerToday,
              selected: styles.datepickerSelected,
              range_start: styles.datepickerRangeControlStart,
              range_end: styles.datepickerRangeControlEnd,
              range_middle: styles.datepickerRangeMiddle,
              chevron: styles.chevron,
              footer: styles.datepickerFooter,
            }}
          />
        </div>
      </div>

      <div className={styles.formItem}>
        <div className={styles.formInput}>
          <div className={styles.formIcon}>
            <FontAwesomeIcon icon={faBed} />
          </div>
          <div className={styles.formControl}>
            <label>Room Type</label>
            <input type="text" value={"King Room"} readOnly disabled />
          </div>
        </div>
        <div className={styles.formInput}>
          <div className={styles.formIcon}>
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          <div className={styles.formControl}>
            <label>Check In</label>
            <input type="date" disabled />
          </div>
        </div>
        <div className={styles.formInput}>
          <div className={styles.formIcon}>
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          <div className={styles.formControl}>
            <label>Check Out</label>
            <input type="date" disabled />
          </div>
        </div>
        <div className={styles.formInput}>
          <div className={styles.formIcon}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className={styles.formControl}>
            <label>Guests</label>
            <input type="number" min={1} value={3} max={12} />
          </div>
        </div>

        <button className={styles.formButton}>Book Now</button>
      </div>
    </form>
  );
}

export default RoomBookingForm;
