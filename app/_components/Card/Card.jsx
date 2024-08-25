import styles from "./styles.module.css";

function Card({ children }) {
  return <article className={styles.Card}>{children}</article>;
}

function Thumbnail({ children }) {
  return <div className={styles.thumbnailContainer}>{children}</div>;
}

function Description({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

Card.Thumbnail = Thumbnail;
Card.Description = Description;

export default Card;
