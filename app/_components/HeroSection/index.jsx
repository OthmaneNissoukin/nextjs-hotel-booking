"use client";
import Slider from "../Slider";
import BookingForm from "../BookingForm";
import styles from "./index.module.css";
import BookingButton from "../BookingButton";
import Modal from "@/app/_components/Modal/Modal";
const images = ["/bg.png", "/bg.png", "/bg.png", "/bg.png"];

function HeroSection({ bookingSearchAction }) {
  return (
    <Slider images={images}>
      <div className={`container ${styles.wrapper}`}>
        <div className="bookingFormContainer">
          <BookingForm bookingSearchAction={bookingSearchAction} />
        </div>
        <div className={styles.heroTitle}>
          <p>Find Comfort In a Foriegn Land With Us</p>
          <p>Book Now, Pay On Arrival</p>
          <div className={styles.heroCTA}>
            <Modal>
              <Modal.ToggleOpen>
                <BookingButton />
              </Modal.ToggleOpen>
              <Modal.Overlay>
                <Modal.Wrapper>
                  <BookingForm bookingSearchAction={bookingSearchAction}>
                    <div>
                      <Modal.ToggleClose>
                        <button type="button" className={styles.closeButton}>
                          Cancel
                        </button>
                      </Modal.ToggleClose>
                    </div>
                  </BookingForm>
                </Modal.Wrapper>
              </Modal.Overlay>
            </Modal>
          </div>
        </div>
      </div>
    </Slider>
  );
}

export default HeroSection;
