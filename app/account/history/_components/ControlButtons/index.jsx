"use client";
import styles from "./styles.module.css";
import Modal from "@/app/_components/Modal/Modal";
import ReservationOverview from "../ReservationOverview";
import DeleteForm from "../DeleteFrom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faEye } from "@fortawesome/free-solid-svg-icons";

function ControlButtons({ deleteAction, reservation }) {
  if (reservation.status === "confirmed")
    return (
      <Modal>
        <Modal.ToggleOpen>
          <button className={styles.overviewButton}>
            <FontAwesomeIcon icon={faEye} />
          </button>
        </Modal.ToggleOpen>
        <Modal.Overlay>
          <Modal.Wrapper>
            <ReservationOverview />
          </Modal.Wrapper>
        </Modal.Overlay>
      </Modal>
    );

  if (reservation.status === "cancelled") return <DeleteForm deleteAction={deleteAction} />;

  return (
    <>
      <Modal>
        <Modal.ToggleOpen>
          <button className={styles.overviewButton}>
            <FontAwesomeIcon icon={faEye} />
          </button>
        </Modal.ToggleOpen>
        <Modal.Overlay hideOnLargerScreens={false}>
          <Modal.Wrapper hideOnLargerScreens={false}>
            <ReservationOverview reservation={reservation} deleteAction={deleteAction}>
              <Modal.ToggleClose>
                <button type="button" className={styles.closeButton}>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </Modal.ToggleClose>
            </ReservationOverview>
          </Modal.Wrapper>
        </Modal.Overlay>

        <Modal.ToggleClose>
          <DeleteForm deleteAction={deleteAction} />
        </Modal.ToggleClose>
      </Modal>
    </>
  );
}

export default ControlButtons;
