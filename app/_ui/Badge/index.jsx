import styles from "./styles.module.css";

function Badge({ type = "success", classNames = "", children }) {
  return <span className={`${styles.badgeContainer} ${styles[type]} ${classNames}`}>{children}</span>;
}

export default Badge;
