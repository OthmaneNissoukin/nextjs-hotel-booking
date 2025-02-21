"use client";
import { useFormState } from "react-dom";
import styles from "./styles.module.css";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import SubmitButton from "@/app/_ui/SubmitButton";
import Alert from "@/app/_ui/Alert";

function ContactForm({ contactAction }) {
  const [state, formAction] = useFormState(contactAction, { errors: {} });
  const resetBtnRef = useRef(null);
  const formRef = useRef(null);

  if (state.isSuccess) {
    toast.success("Message has been sent");
    // CLEAR FORM INPUTS
    resetBtnRef.current?.click();
  } else if (state.errors.critical) {
    toast.error(state.errors.critical);
  } else if (Object.values(state.errors).length) {
    toast.error("Invalid contact data");
  }
  return (
    <form ref={formRef} action={formAction} className={styles.contactForm}>
      {state.errors?.critical && (
        <Alert type="danger">{state.errors?.critical}</Alert>
      )}

      <div>
        <input name="fullname" type="text" placeholder="Name" />
        {state.errors?.fullname && (
          <span className={styles.errorMessage}>{state.errors.fullname}</span>
        )}
      </div>
      <div>
        <input name="email" type="email" placeholder="Email" />
        {state.errors?.email && (
          <span className={styles.errorMessage}>{state.errors.email}</span>
        )}
      </div>
      <div>
        <input name="phone" type="tel" placeholder="Phone" />
        {state.errors?.phone && (
          <span className={styles.errorMessage}>{state.errors.phone}</span>
        )}
      </div>
      <div>
        <textarea name="message" placeholder="Message" rows={5}></textarea>
        {state.errors?.message && (
          <span className={styles.errorMessage}>{state.errors.message}</span>
        )}
      </div>

      <div>
        <SubmitButton type="submit">Send</SubmitButton>
        <button
          type="reset"
          className={styles.resetButton}
          ref={resetBtnRef}
        ></button>
      </div>
      <Toaster position="top-center" />
    </form>
  );
}

export default ContactForm;
