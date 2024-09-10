"use client";

import Alert from "@/app/_ui/Alert";
import ConfirmationButton from "../ConfirmationButton";
import styles from "./styles.module.css";
import { useFormState } from "react-dom";
import SelectCountry from "@/app/_ui/SelectCountry";

const initialState = {
  email: "",
  password: "",
  criticalError: "",
};

function CheckoutForm({ guest, authAction }) {
  const [state, formAction] = useFormState(authAction, initialState);

  return (
    <form action={formAction} className={styles.form}>
      <h2 className={styles.formHeading}>Reservation Confirmation</h2>

      {state.criticalError && <Alert>{state.criticalError}</Alert>}

      <div className={styles.formControlRow}>
        <div className={styles.formControl}>
          <label htmlFor="" className={styles.formLabel}>
            Fullname
          </label>
          <input type="text" name="fullname" defaultValue={guest.fullname} className={styles.formInput} />
          {/* {state.email && <span className={styles.errorMessage}>{state.email}</span>} */}
        </div>

        <div className={styles.formControl}>
          <label htmlFor="" className={styles.formLabel}>
            NationalID
          </label>
          <input type="text" name="nationalID" defaultValue={guest.nationalID} className={styles.formInput} />
          {/* {state.email && <span className={styles.errorMessage}>{state.email}</span>} */}
        </div>
      </div>

      <div className={styles.formControl}>
        <label htmlFor="" className={styles.formLabel}>
          Email Address
        </label>
        <input type="email" name="email" defaultValue={guest.email} className={styles.formInput} />
        {/* {state.email && <span className={styles.errorMessage}>{state.email}</span>} */}
      </div>

      <div className={styles.formControl}>
        <label htmlFor="" className={styles.formLabel}>
          Phone Number
        </label>
        <input type="tel" name="phone" defaultValue={guest.phone} className={styles.formInput} />
        {/* {state.email && <span className={styles.errorMessage}>{state.email}</span>} */}
      </div>

      <div className={styles.formControl}>
        <label htmlFor="" className={styles.formLabel}>
          <span>Where are you from?</span>{" "}
          <span className={styles.countryFlag}>
            <img src={guest.countryFlag} alt={`${guest.nationality ?? "country"} flag`} />
          </span>
        </label>
        <SelectCountry className={styles.formInput} defaultCountry={guest.nationality} />
      </div>

      <div className={styles.formControl}>
        <label htmlFor="" className={styles.formLabel}>
          More Informations
        </label>
        <textarea name="" id="" className={styles.formTextArea} rows={5}></textarea>
      </div>

      <ConfirmationButton />
    </form>
  );
}

export default CheckoutForm;
