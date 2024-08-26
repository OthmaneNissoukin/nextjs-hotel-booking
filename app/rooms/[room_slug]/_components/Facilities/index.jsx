import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
import {
  faBath,
  faChild,
  faCoffee,
  faGamepad,
  faHotTub,
  faSwimmingPool,
  faWheelchair,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import Heading from "@/app/_ui/Heading";

function Facilities() {
  return (
    <div>
      <Heading className="text-center">Facilities</Heading>
      <hr className="decriptionDivider" />
      <table className={styles.facilitiesTable}>
        <tbody>
          <tr>
            <td>
              <span>
                <FontAwesomeIcon className={styles.facilitiyIcon} icon={faWifi} /> <span>High speed in-room wifi</span>
              </span>
            </td>
            <td>
              <span>
                <FontAwesomeIcon className={styles.facilitiyIcon} icon={faCoffee} /> <span>Restaurant</span>
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <FontAwesomeIcon className={styles.facilitiyIcon} icon={faSwimmingPool} /> <span>Swimming Pool</span>
              </span>
            </td>
            <td>
              <span>
                <FontAwesomeIcon className={styles.facilitiyIcon} icon={faChild} /> <span>Child Care</span>
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <FontAwesomeIcon className={styles.facilitiyIcon} icon={faHotTub} /> <span>Hot Tub</span>
              </span>
            </td>
            <td>
              <span>
                <FontAwesomeIcon className={styles.facilitiyIcon} icon={faGamepad} /> <span>Games Room</span>
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span>
                <FontAwesomeIcon className={styles.facilitiyIcon} icon={faBath} /> <span>Bath</span>
              </span>
            </td>
            <td>
              <span>
                <FontAwesomeIcon className={styles.facilitiyIcon} icon={faWheelchair} /> <span>Wheelchair access</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Facilities;
