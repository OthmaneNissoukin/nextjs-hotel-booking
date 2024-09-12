"use client";

import Alert from "@/app/_ui/Alert";
import SignInButton from "../SignInButton";
import styles from "./styles.module.css";
import { useFormState } from "react-dom";
import { usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  email: "",
  password: "",
  criticalError: "",
};

function CredentialsForm({ authAction }) {
  const [state, formAction] = useFormState(authAction, initialState);
  const pathname = usePathname();

  const errors = Object.values(state)?.filter((item) => item.length);
  if (errors.length) errors.forEach((item) => toast.error(item ?? "Failed to sign in, please try again"));

  return (
    <form action={formAction} className={styles.form}>
      <h2 className={styles.loginHeading}>Login</h2>

      {state.criticalError && <Alert>{state.criticalError}</Alert>}
      {pathname === "/reservations/checkout" && (
        <Alert type="warning">Please sign in before confirming your booking!</Alert>
      )}

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
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default CredentialsForm;
