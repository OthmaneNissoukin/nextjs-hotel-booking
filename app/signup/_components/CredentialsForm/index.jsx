"use client";

import Alert from "@/app/_ui/Alert";
import SignUpButton from "../SignUpButton";
import styles from "./styles.module.css";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";

const initialState = {
  email: "",
  password: "",
  critical: "",
};

function CredentialsForm({ registerAction, authAction }) {
  const [state, formAction] = useFormState(registerAction, initialState);

  const [showPassword, setShowPassword] = useState(false);

  const errors = Object.values(state)?.filter((item) => item.length);
  if (errors.length) errors.forEach((item) => toast.error(item ?? "Failed to sign in, please try again"));

  return (
    <form action={formAction} className={styles.form}>
      <h2 className={styles.loginHeading}>Sign Up</h2>

      {state.critical && <Alert>{state.critical}</Alert>}

      <div className={styles.formControl}>
        <label htmlFor="" className={styles.loginLabel}>
          Fullname
        </label>
        <input type="text" name="fullname" className={styles.loginInput} />
        {state.fullname && <span className={styles.errorMessage}>{state.fullname}</span>}
      </div>

      <div className={styles.formControl}>
        <label htmlFor="" className={styles.loginLabel}>
          Email Address
        </label>
        <input type="email" name="email" className={styles.loginInput} />
        {state.email && <span className={styles.errorMessage}>{state.email}</span>}
      </div>
      <div className={styles.formControl}>
        <label htmlFor="" className={styles.loginLabel}>
          Password
        </label>
        <div className={styles.passwordContainer}>
          <input type={showPassword ? "text" : "password"} name="password" className={styles.loginInput} />
          <button type="button" className={styles.pwdToggler} onClick={() => setShowPassword((current) => !current)}>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        {state.password && <span className={styles.errorMessage}>{state.password}</span>}
      </div>

      <div className={styles.formControl}>
        <label htmlFor="" className={styles.loginLabel}>
          Confirm Password
        </label>
        <div className={styles.passwordContainer}>
          <input type={showPassword ? "text" : "password"} name="confirm_password" className={styles.loginInput} />
          <button type="button" className={styles.pwdToggler} onClick={() => setShowPassword((current) => !current)}>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        {state.confirm_password && <span className={styles.errorMessage}>{state.confirm_password}</span>}
      </div>

      <SignUpButton />

      <br />

      <p>
        Already have an account? <Link href="/signin">Sign In</Link>
      </p>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default CredentialsForm;
