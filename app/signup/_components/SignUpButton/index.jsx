import styles from "./styles.module.css";
import { useFormStatus } from "react-dom";

function SignUpButton() {
  const { pending } = useFormStatus();
  return (
    <button className={styles.formButton} disabled={pending}>
      {pending ? "Checking..." : "Sign Up"}
    </button>
  );
}

export default SignUpButton;
