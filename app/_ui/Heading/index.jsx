import styles from "./styles.module.css";

function Heading({ className = "", children }) {
  return (
    <h1 className={`${styles.heading} ${className}`}>
      <span>{children}</span>
    </h1>
  );
}

export default Heading;
