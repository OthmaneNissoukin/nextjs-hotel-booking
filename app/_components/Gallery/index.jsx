import Heading from "@/app/_ui/Heading";
import styles from "./styles.module.css";
import Image from "next/image";

function Gallery() {
  return (
    <section className={styles.gallerySection}>
      <div className="container">
        <Heading className="text-center">Gallery</Heading>
        <div className={styles.galleryGrid}>
          <div className={styles.thumbnail}>
            <Image fill src="/room.png" alt="" />
          </div>
          <div className={styles.thumbnail}>
            <Image fill src="/room.png" alt="" />
          </div>
          <div className={styles.thumbnail}>
            <Image fill src="/room.png" alt="" />
          </div>
          <div className={styles.thumbnail}>
            <Image fill src="/room.png" alt="" />
          </div>
          <div className={styles.thumbnail}>
            <Image fill src="/room.png" alt="" />
          </div>
          <div className={styles.thumbnail}>
            <Image fill src="/room.png" alt="" />
          </div>
          <div className={styles.thumbnail}>
            <Image fill src="/room.png" alt="" />
          </div>
          <div className={styles.thumbnail}>
            <Image fill src="/room.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
