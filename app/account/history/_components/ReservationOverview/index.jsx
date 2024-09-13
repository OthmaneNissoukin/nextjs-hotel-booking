import styles from "./styles.module.css";
import Card from "@/app/_components/Card/Card";
import Image from "next/image";

import { formatToAbrFormat } from "@/app/utils/datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteForm from "../DeleteFrom";

const SUPABASE_ROOMS_URL = process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL;

function ReservationOverview({ deleteAction, reservation, requestUpdateForm }) {
  return (
    <Card>
      <Card.Thumbnail zoomOnHover={false}>
        <Image
          fill
          src={`${SUPABASE_ROOMS_URL}/${reservation.rooms.thumbnail}`}
          alt={`${reservation.rooms.name} thumbnail`}
        />
        {/* <Image fill src={"/bg.png"} /> */}
      </Card.Thumbnail>

      <Card.Description className={styles.overviewDescription}>
        <h2>Deluxe Room</h2>
        <div className={styles.bookingSummary}>
          <h3>Booking Summary</h3>
          <p>
            <span>Arrival</span>
            <span>{formatToAbrFormat(new Date(reservation.start_date))}</span>
          </p>
          <p>
            <span>Departure</span>
            <span>{formatToAbrFormat(new Date(reservation.end_date))}</span>
          </p>
          <p>
            <span>Guests</span>
            <span>{String(reservation.guests_count).padStart(2, "0")}</span>
          </p>
          <p>
            <span>Reservation Date</span>
            <span>{formatToAbrFormat(new Date(reservation.created_at))}</span>
          </p>
          <p>
            <span>Total Price</span>
            <span>${Number(reservation.reserved_price).toFixed(2)}</span>
          </p>
        </div>

        <div className={styles.actionsContainer}>
          <h2>Actions</h2>
          <button className={styles.editButton} onClick={() => requestUpdateForm(true)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <DeleteForm deleteAction={deleteAction} />
        </div>
      </Card.Description>
    </Card>
  );
}

export default ReservationOverview;
