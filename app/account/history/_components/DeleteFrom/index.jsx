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

function DeleteForm({ deleteAction, showLabel = false }) {
  const [state, formAction] = useFormState(deleteAction, initialState);

  if (state?.error) {
    toast.error(state.error);
  } else if (state?.status === "success") {
    toast.success("Your reservation has been deleted");
  }

  return (
    <form action={formAction}>
      <DeleteButton showLabel={showLabel} />
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

function DeleteButton({ showLabel }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={styles.deleteButton}>
      <span>
        <FontAwesomeIcon icon={faTrash} />
      </span>
      {showLabel && <span>Delete</span>}
    </button>
  );
}

export default DeleteForm;
