import styles from "./styles.module.css";

function SubmitButton({ onClick = null, className = "", disabled = false, children }) {
  return (
    <button
      type="button"
      onClick={onClick ? () => onClick() : null}
      disabled={disabled}
      className={`${styles.sendBtn} ${className}`}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
