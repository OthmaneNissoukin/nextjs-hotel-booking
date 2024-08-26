import fa_styles from "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
import { faBed, faCalendar, faDollar, faRuler, faUsers } from "@fortawesome/free-solid-svg-icons";
import Slider from "@/app/_components/Slider";
import Heading from "@/app/_ui/Heading";

function RoomDetails({ params }) {
  console.log(params);
  return (
    <section className="container">
      <Heading className={styles.heading}>King Room</Heading>

      <ul className={styles.features}>
        <li>
          <span className={styles.featureIcon}>
            <FontAwesomeIcon icon={faBed} />
          </span>
          <span className={styles.featureLabel}>Sleeps:</span> 2 Adults
        </li>
        <li>
          <span className={styles.featureIcon}>
            <FontAwesomeIcon icon={faRuler} />
          </span>
          <span className={styles.featureLabel}>Size:</span> 35m²
        </li>
        <li>
          <span className={styles.featureIcon}>
            <FontAwesomeIcon icon={faDollar} />
          </span>
          <span className={styles.featureLabel}>Price:</span> from $300 / night
        </li>
      </ul>

      <div className={styles.sliderContainer}>
        <Slider images={["/bg.png", "/bg.png", "/bg.png"]} />
      </div>

      <form className={styles.roomBookingForm}>
        <div className={styles.formItem}>
          <div className={styles.formIcon}>
            <FontAwesomeIcon icon={faBed} />
          </div>
          <div className={styles.formControl}>
            <label>Room Type</label>
            <input type="text" value={"King Room"} readOnly disabled />
          </div>
        </div>
        <div className={styles.formItem}>
          <div className={styles.formIcon}>
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          <div className={styles.formControl}>
            <label>Check In</label>
            <input type="date" />
          </div>
        </div>
        <div className={styles.formItem}>
          <div className={styles.formIcon}>
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          <div className={styles.formControl}>
            <label>Check Out</label>
            <input type="date" />
          </div>
        </div>
        <div className={styles.formItem}>
          <div className={styles.formIcon}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className={styles.formControl}>
            <label>Guests</label>
            <input type="number" min={1} value={3} max={12} />
          </div>
        </div>
        <div className={styles.formItem}>
          <button className={styles.formButton}>Book Now</button>
        </div>
      </form>

      <div className={styles.description}>
        <Heading className={styles.descriptionHeading}>Room Description</Heading>

        <hr className={styles.decriptionDivider} />

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

      {/* <div>Slider</div>
      <div>Facilities</div>

      <div>Video Tour</div> */}
    </section>
  );
}

export default RoomDetails;
