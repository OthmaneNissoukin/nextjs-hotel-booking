"use client";
import { useFormStatus } from "react-dom";
import styles from "./styles.module.css";

function SubmitButton({
  onClick = null,
  type = "button",
  className = "",
  content = { pending: "Loading...", base: "Submit" },
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type={type}
      onClick={onClick ? () => onClick() : null}
      disabled={pending}
      className={`${styles.sendBtn} ${className}`}
    >
      {pending ? content.pending : content.base}
    </button>
  );
}

export default SubmitButton;
