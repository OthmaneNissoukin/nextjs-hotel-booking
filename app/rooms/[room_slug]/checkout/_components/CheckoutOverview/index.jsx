import { signIn } from "@/auth";
import styles from "./styles.module.css";
import Card from "@/app/_components/Card/Card";

function CheckoutOverview() {
  return (
    <div>
      <Card>
        <Card.Thumbnail>
          <img src="/bg.png" alt="" />
        </Card.Thumbnail>

        <Card.Description className={styles.overviewDescription}>
          <h2>King Room</h2>
          <div className={styles.bookingSummary}>
            <h3>Booking Summary</h3>
            <p>
              <span>Arrival</span>
              <span>Fri, Dec 01</span>
            </p>
            <p>
              <span>Arrival</span>
              <span>Tue, Dec 05</span>
            </p>
            <p>
              <span>Guests</span>
              <span>04</span>
            </p>
          </div>

          <div className={styles.bookingSummary}>
            <h3>Pricing Breakdown</h3>
            <p>
              <span>$30.00 x night</span>
              <span>$30.00</span>
            </p>
            <p>
              <span>Cleaning Fee</span>
              <span>$10.00</span>
            </p>
            <p>
              <span>Aeroport Transport</span>
              <span>$12.00</span>
            </p>
          </div>

          <div className={styles.totalPrice}>
            <span>Total Without Taxes</span>
            <span>$52.00</span>
          </div>
        </Card.Description>
      </Card>
    </div>
  );
}

export default CheckoutOverview;
