"use client";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import BookingButton from "../BookingButton";
import styles from "./index.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatISO } from "date-fns";

function BookingForm({ children }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const router = useRouter();

  function handleStartSelection(date) {
    setStartDate(date);
    console.log(date);
  }

  function handleEndSelection(date) {
    setEndDate(date);
    console.log(date);
  }

  function handleSearch() {
    if (!startDate || !endDate) return;
    // const params = new URLSearchParams(searchParams);
    const arrival = formatISO(new Date(startDate), { representation: "date" });
    const departure = formatISO(new Date(endDate), { representation: "date" });
    const formatedRange = `${arrival}_${departure}`;
    // params.set("range", formatedRange);
    // replace(`${pathname}?${params.toString()}`, { scroll: false });
    router.push(`rooms?range=${formatedRange}`);
  }

  return (
    <form className={styles.bookingForm}>
      <h1 className={styles.formHeading}>BOOK A ROOM ONLINE</h1>
      <div className={styles.formControl}>
        <label htmlFor="" className={styles.formLabel}>
          Arrival
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleStartSelection(date)}
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
          onChange={(date) => handleEndSelection(date)}
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
        <BookingButton onClick={handleSearch} />
        <div>{children}</div>
      </div>
    </form>
  );
}

export default BookingForm;
