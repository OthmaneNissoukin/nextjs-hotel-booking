import Heading from "@/app/_ui/Heading";
import styles from "./styles.module.css";

function RoomDescription() {
  return (
    <div className={styles.description}>
      <Heading className="text-center">Room Description</Heading>

      <hr className="decriptionDivider" />

      <div className={styles.descriptionContent}>
        <p>
          Etiam at hendrerit sem. Quisque porta velit quis dolor interdum, sit amet imperdiet leo posuere. Nam id nisl
          scelerisque, commodo ex vel, vulputate eros. Aenean sit amet rutrum odio. Suspendisse faucibus ac turpis et
          tincidunt. Cras non quam mauris. Nullam commodo a urna sed faucibus. Nam dolor odio, eleifend quis dictum
          aliquet, ultrices vel purus.
        </p>
        <p>
          Phasellus at congue lectus, sit amet tincidunt nunc. Vivamus fermentum nunc ac dui faucibus consequat.
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin hendrerit sit
          amet est at laoreet. Nam auctor rhoncus accumsan. Morbi et turpis ac ligula tempor tincidunt.
        </p>
      </div>
    </div>
  );
}

export default RoomDescription;
