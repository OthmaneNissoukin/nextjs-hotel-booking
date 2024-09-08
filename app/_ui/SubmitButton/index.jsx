import styles from "./styles.module.css";

function SubmitButton({ onClick = null, type = "button", className = "", disabled = false, children }) {
  return (
    <button
      type={type}
      onClick={onClick ? () => onClick() : null}
      disabled={disabled}
      className={`${styles.sendBtn} ${className}`}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
