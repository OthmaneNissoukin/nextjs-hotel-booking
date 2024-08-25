import Heading from "@/app/_ui/Heading";
import styles from "./styles.module.css";

function Gallery() {
  return (
    <section className={styles.gallerySection}>
      <div className="container">
        <Heading className="text-center">Gallery</Heading>
        <div className={styles.galleryGrid}>
          <div className={styles.thumbnail}>
            <img src="/room.png" alt="" />
          </div>
          <div className={styles.thumbnail}>
            <img src="/room.png" alt="" />
          </div>
          <div className={styles.thumbnail}>
            <img src="/room.png" alt="" />
          </div>
          <div className={styles.thumbnail}>
            <img src="/room.png" alt="" />
          </div>
          <div className={styles.thumbnail}>
            <img src="/room.png" alt="" />
          </div>
          <div className={styles.thumbnail}>
            <img src="/room.png" alt="" />
          </div>
          <div className={styles.thumbnail}>
            <img src="/room.png" alt="" />
          </div>
          <div className={styles.thumbnail}>
            <img src="/room.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
