"use client";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import BookingButton from "../BookingButton";
import styles from "./index.module.css";
import { useState } from "react";

function BookingForm({ children }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <form className={styles.bookingForm}>
      <h1 className={styles.formHeading}>BOOK A ROOM ONLINE</h1>
      <div className={styles.formControl}>
        <label htmlFor="" className={styles.formLabel}>
          Arrival
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className={styles.input}
          dateFormat={"dd/MM/yyyy"}
          excludeDateIntervals={[{ start: new Date("01/01/1970"), end: new Date() }]}
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="" className={styles.formLabel}>
          Departure
        </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className={styles.input}
          dateFormat={"dd/MM/yyyy"}
          excludeDateIntervals={[{ start: new Date("01/01/1970"), end: new Date() }]}
        />
      </div>

      <div className={styles.actions}>
        <BookingButton />
        <div>{children}</div>
      </div>
    </form>
  );
}

export default BookingForm;
