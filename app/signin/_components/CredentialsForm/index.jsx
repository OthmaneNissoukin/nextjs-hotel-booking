"use client";

import Alert from "@/app/_ui/Alert";
import SignInButton from "../SignInButton";
import styles from "./styles.module.css";
import { useFormState } from "react-dom";

const initialState = {
  email: "",
  password: "",
  criticalError: "",
};

function CredentialsForm({ authAction }) {
  const [state, formAction] = useFormState(authAction, initialState);

  return (
    <form action={formAction} className={styles.form}>
      <h2 className={styles.loginHeading}>Login</h2>

      {state.criticalError && <Alert>{state.criticalError}</Alert>}

      <div className={styles.formControl}>
        <label htmlFor="" className={styles.loginLabel}>
          Email Address
        </label>
        <input type="email" name="email" defaultValue={"trigger2000p@gmail.com"} className={styles.loginInput} />
        {/* {state.email && <span className={styles.errorMessage}>{state.email}</span>} */}
      </div>
      <div className={styles.formControl}>
        <label htmlFor="" className={styles.loginLabel}>
          Password
        </label>
        <input type="password" name="password" defaultValue={"azerty"} className={styles.loginInput} />
        {/* {state.password && <span className={styles.errorMessage}>{state.password}</span>} */}
      </div>

      <SignInButton />

      <br />
      <a href="#">Forget Password?</a>
    </form>
  );
}

export default CredentialsForm;
