import styles from "./styles.module.css";

import EditContainer from "../EditContainer";
import { reservationUpdateAction } from "@/app/_lib/actions";

async function EditSection({ reservation }) {
  return (
    <div className={`${styles.formSection} container`}>
      <EditContainer reservation={reservation} reservationUpdateAction={reservationUpdateAction} />
    </div>
  );
}

export default EditSection;
