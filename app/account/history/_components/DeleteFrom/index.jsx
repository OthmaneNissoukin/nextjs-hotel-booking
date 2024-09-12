"use client";

import styles from "./styles.module.css";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  error: "",
};

function DeleteForm({ deleteAction }) {
  const [state, formAction] = useFormState(deleteAction, initialState);

  if (state?.error) {
    toast.error(state.error);
  } else if (state?.status === "success") {
    toast.success("Your reservation has been deleted");
  }

  return (
    <form action={formAction}>
      <DeleteButton />
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={styles.deleteButton}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}

export default DeleteForm;
