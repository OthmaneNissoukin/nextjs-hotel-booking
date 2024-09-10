import styles from "./styles.module.css";

function Banner({ title }) {
  return (
    <div className={styles.banner}>
      <div className={styles.overlay}>
        <h1 className={styles.bannerHeading}>{title}</h1>
      </div>
    </div>
  );
}

export default Banner;
