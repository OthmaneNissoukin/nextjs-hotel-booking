"use client";
import styles from "./styles.module.css";
import Modal from "@/app/_components/Modal/Modal";
import ReservationOverview from "../ReservationOverview";
import DeleteForm from "../DeleteFrom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faEye } from "@fortawesome/free-solid-svg-icons";

function ControlButtons({ deleteAction, reservation, reservationCancelAction }) {
  return (
    <div className={styles.buttonsContainer}>
      <Modal>
        <Modal.ToggleOpen>
          <button className={styles.overviewButton}>
            <FontAwesomeIcon icon={faEye} />
          </button>
        </Modal.ToggleOpen>
        <Modal.Overlay hideOnLargerScreens={false}>
          <Modal.Wrapper hideOnLargerScreens={false}>
            <ReservationOverview
              reservation={reservation}
              allowDelete={false}
              reservationCancelAction={reservationCancelAction}
              deleteAction={deleteAction}
            >
              <Modal.ToggleClose>
                <button type="button" className={styles.closeButton}>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </Modal.ToggleClose>
            </ReservationOverview>
          </Modal.Wrapper>
        </Modal.Overlay>
        {reservation.status !== "confirmed" && <DeleteForm deleteAction={deleteAction} />}
      </Modal>
    </div>
  );
}

export default ControlButtons;
