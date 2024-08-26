import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
import { faBed, faDollar, faRuler } from "@fortawesome/free-solid-svg-icons";

function Features() {
  return (
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
  );
}

export default Features;
