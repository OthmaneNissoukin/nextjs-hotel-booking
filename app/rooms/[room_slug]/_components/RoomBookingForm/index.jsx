"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
import { faBed, faCalendar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Suspense, useState } from "react";
import { formatISO } from "date-fns";
import FormDayPicker from "../FormDayPicker";
import Loader from "@/app/_ui/Loader";

import { useFormState } from "react-dom";

const initialState = {
  dateError: "",
  guestsError: "",
  criticalError: "",
};

function RoomBookingForm({ bookingAction, room }) {
  const [state, formAction] = useFormState(bookingAction, initialState);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [guests, setGuests] = useState("");

  function handleDateSelection(range) {
    if (!range) return;
    const from = formatISO(range?.from, { representation: "date" });
    const to = formatISO(range?.to, { representation: "date" });
    console.log({ from, to });

    setStartDate(from);
    setEndDate(to);
  }

  function handleSubmit() {
    const newForm = new FormData();
    newForm.set("start_date", startDate);
    newForm.set("end_date", endDate);
    newForm.set("guests_count", guests);
    newForm.set("room_id", room.id);
    formAction(newForm);
  }

  return (
    <form className={styles.roomBookingForm}>
      <Suspense
        fallback={
          <div className="section-loader">
            <Loader />
          </div>
        }
      >
        <FormDayPicker handleDateSelection={handleDateSelection} />
      </Suspense>

      <div className={styles.formItem}>
        <div className={styles.formInput}>
          <div className={styles.formIcon}>
            <FontAwesomeIcon icon={faBed} />
          </div>
          <div className={styles.formControl}>
            <label>Room Type</label>
            <input type="text" value={room.name} readOnly disabled />
          </div>
        </div>
        <div className={styles.formInput}>
          <div className={styles.formIcon}>
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          <div className={styles.formControl}>
            <label>Check In</label>
            <input type="date" value={startDate} disabled />
          </div>
        </div>
        <div className={styles.formInput}>
          <div className={styles.formIcon}>
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          <div className={styles.formControl}>
            <label>Check Out</label>
            <input type="date" value={endDate} disabled />
          </div>
        </div>
        <div className={styles.formInput}>
          <div className={styles.formIcon}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className={styles.formControl}>
            <label>Guests</label>
            <select name="" id="" onChange={(e) => setGuests(e.target.value)}>
              <option value="">Select guests number</option>
              {Array.from(Array(room?.capacity ?? 0)).map((item, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            {/* <input
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              max={room.capacity}
            /> */}
          </div>
        </div>

        <button type="button" onClick={handleSubmit} className={styles.formButton}>
          Book Now
        </button>
      </div>
    </form>
  );
}

export default RoomBookingForm;
