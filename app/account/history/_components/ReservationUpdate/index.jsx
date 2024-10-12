"use client";
import styles from "./styles.module.css";
import Card from "@/app/_components/Card/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { addMonths, areIntervalsOverlapping, formatISO, isAfter, isBefore } from "date-fns";
import { getRoomReservations } from "@/app/_lib/supabase/reservations";

function ReservationUpdate({ reservation }) {
  const [startDate, setStartDate] = useState(new Date(reservation.start_date));
  const [endDate, setEndDate] = useState(new Date(reservation.end_date));
  const [disabledDays, setDisabledDays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rangeError, setRangeError] = useState("");

  useEffect(() => {
    if (!reservation.room_id) return;
    async function getBusyDays() {
      setIsLoading(true);
      const reservations = await getRoomReservations(reservation.room_id);

      setDisabledDays(
        reservations.map((item) => ({
          start: new Date(item.start_date),
          end: new Date(item.end_date),
        }))
      );
      setIsLoading(false);
    }

    getBusyDays();
  }, []);

  function handleArrivalSelect(date) {
    setStartDate(date);
  }

  function handleDepartureSelect(date) {
    setRangeError("");
    const selectedDateRange = { start: new Date(formatISO(startDate)), end: new Date(formatISO(date)) };
    const isIntersecting = disabledDays.find((range) =>
      areIntervalsOverlapping(selectedDateRange, { start: new Date(range.start), end: new Date(range.end) })
    );

    if (isIntersecting) {
      setRangeError("Invalid! The selected range has already a booked plan(s)");
    }

    const isReversedRange = isAfter(selectedDateRange.start, selectedDateRange.end);

    if (isReversedRange) {
      setRangeError("Invalid! Please select a valid date range");
    }
  }

  async function handleSubmit() {
    const updateFormData = new Form();
    updateFormData.set("start_date", startDate);
    updateFormData.set("end_date", endDate);
    updateFormData.set("guests_count", guests);
  }

  return (
    <>
      <Card>
        <Card.Description className={styles.overviewDescription}>
          <h2>Edit Reservation</h2>
          <form className={styles.formControl}>
            <div>
              <label htmlFor="">Guests</label>
              <select name="" id="" defaultValue={reservation.guests_count}>
                <option value="">Select guests number</option>
                {Array.from(Array(reservation.rooms?.capacity ?? 0)).map((item, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-update-form">
              <label htmlFor="">Arrival</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                showDisabledMonthNavigation
                onSelect={(date) => handleArrivalSelect(date)}
                minDate={new Date()}
                maxDate={addMonths(new Date(), 10)}
                startDate={startDate}
                disabled={isLoading}
                excludeDateIntervals={disabledDays}
                dateFormat={"dd/MM/yyyy"}
              />
            </div>
            <div className="modal-update-form">
              <label htmlFor="">Departure</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                showDisabledMonthNavigation
                onSelect={(date) => handleDepartureSelect(date)}
                minDate={new Date()}
                maxDate={addMonths(new Date(), 10)}
                startDate={startDate}
                endDate={endDate}
                disabled={isLoading}
                excludeDateIntervals={disabledDays}
                dateFormat={"dd/MM/yyyy"}
              />
              {rangeError && <span className={styles.errorMessage}>{rangeError}</span>}
            </div>
          </form>

          <div className={styles.actionsContainer}>
            <h2>Actions</h2>
            <button className={styles.editButton}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            {/* <DeleteForm deleteAction={deleteAction} /> */}
          </div>
        </Card.Description>
      </Card>
    </>
  );
}

export default ReservationUpdate;
