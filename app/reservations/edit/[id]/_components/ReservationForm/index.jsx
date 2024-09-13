"use client";

import ConfirmationButton from "../ConfirmationButton";
import styles from "./styles.module.css";

const initialState = {
  fullname: "",
  email: "",
  phone: "",
  nationalID: "",
  message: "",
  criticalError: "",
};

function ReservationForm({ capacity, setGuests, guests, handleSubmit, children }) {
  return (
    <form action={handleSubmit} className={styles.form}>
      <div>
        <div className={styles.formControl}>
          <label htmlFor="" className={styles.formLabel}>
            Guests Number:
          </label>
          <select
            defaultValue={guests}
            name=""
            id=""
            className={styles.formInput}
            onChange={(e) => (e.target.value ? setGuests(e.target.value) : null)}
          >
            <option value="">Select guests number</option>
            {Array.from(Array(capacity ?? 0)).map((item, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        {children}
      </div>
      <div>
        <ConfirmationButton />
      </div>
    </form>
  );
}

export default ReservationForm;
