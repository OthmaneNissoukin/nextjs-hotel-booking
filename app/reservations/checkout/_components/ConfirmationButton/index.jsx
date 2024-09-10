import styles from "./styles.module.css";
import { useFormStatus } from "react-dom";

function ConfirmationButton() {
  const { pending } = useFormStatus();
  return (
    <button className={styles.formButton} disabled={pending}>
      {pending ? "Processing..." : "Confirm"}
    </button>
  );
}

export default ConfirmationButton;
