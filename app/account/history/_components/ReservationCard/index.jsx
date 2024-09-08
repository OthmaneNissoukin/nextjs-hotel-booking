import Image from "next/image";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Badge from "@/app/_ui/Badge";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;

function ReservationCard({ thumbnailPath = "/bg.png", title, guestsCount, date, price, status }) {
  return (
    <article className={styles.reservationItem}>
      <div className={styles.reservationThumbnail}>
        <Image fill src={`${SUPABASE_ROOMS_URL}/${thumbnailPath}`} />
      </div>

      <div className={styles.reservationInfos}>
        <div className={styles.reservationOverview}>
          <h2>{title}</h2>
          <p>{guestsCount} Guests</p>
          <p>{date}</p>
          {/* CREATE A SEPARATED COMPONENT FOR THE STATUS AS BADGE */}
          <Badge
            type={status == "unconfirmed" ? "warning" : status == "canceled" || status == "finished" ? "danger" : ""}
          >
            {status}
          </Badge>
        </div>
        <div className={styles.reservationPriceContainer}>
          {/* USE 3rd PARTY API FOR CURRENCY CONVERSION */}
          <p>{price}</p>
          <button>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ReservationCard;
