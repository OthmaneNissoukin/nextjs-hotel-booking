import SubmitButton from "@/app/_ui/SubmitButton";
import styles from "./styles.module.css";
import Heading from "@/app/_ui/Heading";

function Profile() {
  return (
    <>
      <Heading textClassName={styles.heading}>Edit Profile</Heading>
      <form>
        <div className={styles.profileFormInputs}>
          <div>
            <label className={styles.formLabel}>Fullname</label>
            <input className={styles.formControl} type="text" placeholder="Alaoui Hassan" />
          </div>
          <div>
            <label className={styles.formLabel}>National ID</label>
            <input className={styles.formControl} type="text" placeholder="A75K0B2J74P" />
          </div>
          <div>
            <label className={styles.formLabel}>Email Address</label>
            <input className={styles.formControl} type="email" placeholder="john.doe@mail.com" />
          </div>
          <div>
            <label className={styles.formLabel}>Nationality</label>
            <input className={styles.formControl} type="text" placeholder="Moroccan" />
          </div>
          <div>
            <label className={styles.formLabel}>Phone Number</label>
            <input className={styles.formControl} type="tel" placeholder="+212 6 879900830" />
          </div>
        </div>
        <div className={styles.formButtonContainer}>
          <SubmitButton className={styles.formButton}>Save</SubmitButton>
        </div>
      </form>
    </>
  );
}

export default Profile;
