"use client";
import { useFormState } from "react-dom";
import styles from "./styles.module.css";
import { useRef } from "react";
import { Toaster } from "react-hot-toast";
import SubmitButton from "@/app/_ui/SubmitButton";
import Alert from "@/app/_ui/Alert";

function ContactForm({ contactAction }) {
  const [state, formAction] = useFormState(contactAction, { errors: null });
  const resetBtnRef = useRef(null);
  const formRef = useRef(null);

  if (state.isSuccess) {
    toast.success("Message has been sent");
    // CLEAR FORM INPUTS
    resetBtnRef.current?.click();
  }
  return (
    <form ref={formRef} action={formAction} className={styles.contactForm}>
      {state.errors?.critical && (
        <Alert type="danger">{state.errors?.critical}</Alert>
      )}

      <div>
        <input name="fullname" type="text" placeholder="Name" />
      </div>
      <div>
        <input name="email" type="email" placeholder="Email" />
      </div>
      <div>
        <input name="phone" type="tel" placeholder="Phone" />
      </div>
      <div>
        <textarea name="message" placeholder="Message" rows={5}></textarea>
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
