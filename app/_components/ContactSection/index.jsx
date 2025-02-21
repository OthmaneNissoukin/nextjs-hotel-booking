import Heading from "@/app/_ui/Heading";
import ContactForm from "../ContactForm";
import ContactMap from "../ContactMap";
import styles from "./styles.module.css";
import { contactAction } from "@/app/_lib/actions";

function ContactSection() {
  return (
    <section className={styles.contactSection}>
      <div className="container">
        <Heading className={`text-center ${styles.heading}`}>
          Contact Us
        </Heading>
        <div className={`${styles.contactContainer}`}>
          <ContactForm contactAction={contactAction} />
          <ContactMap />
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
