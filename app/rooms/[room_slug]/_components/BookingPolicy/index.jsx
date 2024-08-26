import Accordion from "@/app/_components/Accordion";
import Heading from "@/app/_ui/Heading";

import styles from "./styles.module.css";

function BookingPolicy() {
  return (
    <section>
      <Heading className="text-center">Booking Policy</Heading>

      <hr className="decriptionDivider" />

      <div className={styles.accordion}>
        <Accordion label={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Accordion>
        <Accordion label={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Accordion>
        <Accordion label={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Accordion>
      </div>
    </section>
  );
}

export default BookingPolicy;
