// TODO: Use Compound Component for this card, you have already built it once😤
import Heading from "@/app/_ui/Heading";
import styles from "./styles.module.css";
import Card from "../Card/Card";
import Image from "next/image";
function Blog() {
  return (
    <section className={styles.blogSection}>
      <div className="container">
        <Heading className={styles.heading}>Blog</Heading>
        <p className={styles.description}>Lorem Ipsum is available, but the majority have suffered</p>

        <div className={styles.blogGrid}>
          <Card>
            <Card.Thumbnail>
              <Image fill src="/bg.png" alt="" />
            </Card.Thumbnail>
            <Card.Description className={styles.blogDescriptionContainer}>
              <h2 className={styles.blogHeading}>Bed Room</h2>
              <p className={styles.blogLabel}>The standard chunck</p>
              <p className={styles.blogDescription}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae veniam fugiat vero nesciunt iste laborum
                pariatur voluptatum sed. Cumque nulla officiis repellendus dolorum fugit et dolores doloribus. Earum,
                est quo!
              </p>
            </Card.Description>
          </Card>
          <Card>
            <Card.Thumbnail>
              <Image fill src="/bg.png" alt="" />
            </Card.Thumbnail>
            <Card.Description className={styles.blogDescriptionContainer}>
              <h2 className={styles.blogHeading}>Bed Room</h2>
              <p className={styles.blogLabel}>The standard chunck</p>
              <p className={styles.blogDescription}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae veniam fugiat vero nesciunt iste laborum
                pariatur voluptatum sed. Cumque nulla officiis repellendus dolorum fugit et dolores doloribus. Earum,
                est quo!
              </p>
            </Card.Description>
          </Card>

          <Card>
            <Card.Thumbnail>
              <Image fill src="/bg.png" alt="" />
            </Card.Thumbnail>
            <Card.Description className={styles.blogDescriptionContainer}>
              <h2 className={styles.blogHeading}>Bed Room</h2>
              <p className={styles.blogLabel}>The standard chunck</p>
              <p className={styles.blogDescription}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae veniam fugiat vero nesciunt iste laborum
                pariatur voluptatum sed. Cumque nulla officiis repellendus dolorum fugit et dolores doloribus. Earum,
                est quo!
              </p>
            </Card.Description>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Blog;
