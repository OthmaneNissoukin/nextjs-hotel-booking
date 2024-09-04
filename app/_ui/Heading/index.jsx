import styles from "./styles.module.css";

function Heading({ className = "", textClassName = "", children }) {
  return (
    <h1 className={`${styles.heading} ${className}`}>
      <span className={textClassName}>{children}</span>
    </h1>
  );
}

export default Heading;
