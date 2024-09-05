import Heading from "@/app/_ui/Heading";
import styles from "./styles.module.css";
import Image from "next/image";

function About() {
  return (
    <section className={styles.aboutSection}>
      <div className={`container ${styles.aboutContainer}`}>
        <div className={styles.description}>
          <Heading>About Us</Heading>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis perferendis itaque iure consequatur iusto
            omnis sapiente, doloribus animi velit vero impedit repellendus minus eaque quos voluptatum eum obcaecati
            ducimus sequi! Blanditiis impedit praesentium labore amet. Numquam molestias, praesentium iste minus quis
            cupiditate ea voluptatem natus, impedit perferendis distinctio ullam atque enim error, quasi sit? Iure
            quibusdam aperiam nostrum enim. Sequi.
          </p>
        </div>
        <div className={styles.gallery}>
          <div>
            <Image fill src="/bg.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
