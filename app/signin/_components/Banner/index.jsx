import styles from "./styles.module.css";

function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.overlay}>
        <h1 className={styles.bannerHeading}>My Account</h1>
      </div>
    </div>
  );
}

export default Banner;
