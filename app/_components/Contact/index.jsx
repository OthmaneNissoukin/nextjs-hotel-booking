import Heading from "@/app/_ui/Heading";
import styles from "./styles.module.css";
import ContactMap from "../ContactMap";
import SubmitButton from "@/app/_ui/SubmitButton";

function Contact() {
  return (
    <section className={styles.contactSection}>
      <div className="container">
        <Heading className={`text-center ${styles.heading}`}>Contact Us</Heading>
        <div className={`${styles.contactContainer}`}>
          <form action="" className={styles.contactForm}>
            <div>
              <input type="text" placeholder="Name" />
            </div>
            <div>
              <input type="email" placeholder="Email" />
            </div>
            <div>
              <input type="tel" placeholder="Phone" />
            </div>
            <div>
              <textarea placeholder="Message" rows={5}></textarea>
            </div>

            <div>
              <SubmitButton>Send</SubmitButton>
            </div>
          </form>
          <ContactMap />
        </div>
      </div>
    </section>
  );
}

export default Contact;
