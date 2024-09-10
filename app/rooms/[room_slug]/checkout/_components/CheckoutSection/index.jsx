import { authAction } from "@/app/_lib/actions";
import CheckoutForm from "../CheckoutForm";
import CheckoutOverview from "../CheckoutOverview";
import styles from "./styles.module.css";

function CheckoutSection() {
  return (
    <div className={`${styles.formSection} container`}>
      <CheckoutForm authAction={authAction} />

      <CheckoutOverview />
    </div>
  );
}

export default CheckoutSection;
