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

function CheckoutForm({ authAction }) {
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
          <input type="text" name="fullname" defaultValue={""} className={styles.formInput} />
          {/* {state.email && <span className={styles.errorMessage}>{state.email}</span>} */}
        </div>

        <div className={styles.formControl}>
          <label htmlFor="" className={styles.formLabel}>
            NationalID
          </label>
          <input type="text" name="nationalID" defaultValue={""} className={styles.formInput} />
          {/* {state.email && <span className={styles.errorMessage}>{state.email}</span>} */}
        </div>
      </div>

      <div className={styles.formControl}>
        <label htmlFor="" className={styles.formLabel}>
          Email Address
        </label>
        <input type="email" name="email" defaultValue={"trigger2000p@gmail.com"} className={styles.formInput} />
        {/* {state.email && <span className={styles.errorMessage}>{state.email}</span>} */}
      </div>

      <div className={styles.formControl}>
        <label htmlFor="" className={styles.formLabel}>
          Phone Number
        </label>
        <input type="tel" name="phone" defaultValue={""} className={styles.formInput} />
        {/* {state.email && <span className={styles.errorMessage}>{state.email}</span>} */}
      </div>

      <div className={styles.formControl}>
        <label htmlFor="" className={styles.formLabel}>
          Where are you from?
        </label>
        <SelectCountry className={styles.formInput} />
      </div>

      <div className={styles.formControl}>
        <label htmlFor="" className={styles.formLabel}>
          More Informations
        </label>
        <textarea name="" id="" className={styles.formTextArea} rows={5}></textarea>
      </div>

      <ConfirmationButton />

      <br />
      <a href="#">Forget Password?</a>
    </form>
  );
}

export default CheckoutForm;
