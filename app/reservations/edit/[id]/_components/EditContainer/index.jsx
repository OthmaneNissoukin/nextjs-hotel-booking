"use client";
import { useCallback, useState } from "react";
import CheckoutOverview from "../CheckoutOverview";
import ReservationForm from "../ReservationForm";

import FormDayPicker from "@/app/rooms/[room_slug]/_components/FormDayPicker";
import { formatISO } from "date-fns";

function EditContainer({ reservation }) {
  const [startDate, setStartDate] = useState(new Date(reservation.start_date));
  const [endDate, setEndDate] = useState(new Date(reservation.end_date));

  const [guests, setGuests] = useState(reservation.rooms.capacity);

  const handleDateSelection = useCallback((range) => {
    console.log(range);
    if (!range) return;
    const from = formatISO(range?.from, { representation: "date" });
    const to = formatISO(range?.to, { representation: "date" });

    console.log(from, to);

    setStartDate(from);
    setEndDate(to);
  }, []);

  return (
    <>
      <ReservationForm
        handleDateSelection={handleDateSelection}
        capacity={reservation.rooms.capacity}
        setGuests={setGuests}
        guests={guests}
      >
        <FormDayPicker handleDateSelection={handleDateSelection} start={startDate} end={endDate} />
      </ReservationForm>
      <CheckoutOverview reservation={reservation} start={startDate} end={endDate} guests={guests} />
    </>
  );
}

export default EditContainer;
