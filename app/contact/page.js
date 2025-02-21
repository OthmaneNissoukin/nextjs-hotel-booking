import Banner from "../_components/Banner";
import ContactForm from "../_components/ContactForm";
import ContactMap from "../_components/ContactMap";
import { createMessage } from "../_lib/supabase/inbox";
import { contactSchema } from "../_lib/zodSchemas";
import Heading from "../_ui/Heading";

import styles from "./styles.module.css";

export const metadata = {
  title: "Contact Us",
  description: "Reach out to the Hotel Booking App ",
};

async function Page() {
  async function contactAction(state, formData) {
    "use server";
    let currentState = {
      errors: null,
      isSuccess: false,
    };

    const fullname = formData.get("fullname");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    const validation = contactSchema.safeParse({
      fullname,
      email,
      phone,
      message,
    });

    if (!validation.success) {
      const errors = {};
      validation.error.issues.forEach((item) => {
        errors[item.path.at(0)] = item.message;
      });
      return { ...currentState, errors };
    }

    try {
      await createMessage({ fullname, email, phone, message });
    } catch (err) {
      return {
        ...currentState,
        errors: { ...currentState.errors, critical: err.message },
      };
    }

    return { ...currentState, isSuccess: true, errors: null };
  }

  return (
    <>
      <Banner title={"REACHING OUT"} />
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
    </>
  );
}

export default Page;
