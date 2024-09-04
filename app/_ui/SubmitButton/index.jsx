import styles from "./styles.module.css";

function SubmitButton({ onClick = null, className = "", children }) {
  return (
    <button type="button" onClick={onClick?.()} className={`${styles.sendBtn} ${className}`}>
      {children}
    </button>
  );
}

export default SubmitButton;
