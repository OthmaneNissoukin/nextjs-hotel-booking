import SubmitButton from "@/app/_ui/SubmitButton";
import styles from "./styles.module.css";
import { getGuestById, updateGuest } from "@/app/_lib/supabase/guests";
import { redirect } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";

async function ProfileForm({ user }) {
  const guest = await getGuestById(user.id);
  console.log(guest);

  if (!guest) redirect("signin");

  async function guestUpdateAction(formData) {
    "use server";
    // TODO: ADD FORM VALIDATION FOR ALL FIELDS
    // TODO: STYLE THE TOSTSIFY COMPONENT

    const guestID = user.id;
    const fullname = formData.get("fullname");
    const nationality = formData.get("nationality");
    const email = formData.get("email");
    const phone = formData.get("phone");

    const updateData = await updateGuest(guestID, fullname, nationality, phone, email);
  }

  return (
    <form action={guestUpdateAction}>
      <div className={styles.profileFormInputs}>
        <div>
          <label className={styles.formLabel}>Fullname</label>
          <input
            className={styles.formControl}
            type="text"
            placeholder="Alaoui Hassan"
            name="fullname"
            defaultValue={guest.fullname}
          />
        </div>
        <div>
          <label className={styles.formLabel}>Email Address</label>
          <input
            className={styles.formControl}
            defaultValue={guest.email}
            type="email"
            placeholder="john.doe@mail.com"
            name="email"
          />
        </div>
        <div>
          <label className={styles.formLabel}>Nationality</label>
          <input
            className={styles.formControl}
            defaultValue={guest.nationality}
            type="text"
            placeholder="Moroccan"
            name="nationality"
          />
        </div>
        <div>
          <label className={styles.formLabel}>Phone Number</label>
          <input
            className={styles.formControl}
            defaultValue={guest.phone}
            type="tel"
            placeholder="+212 6 879900830"
            name="phone"
          />
        </div>
      </div>
      <div className={styles.formButtonContainer}>
        <SubmitButton type="submit" className={styles.formButton}>
          Save
        </SubmitButton>
      </div>
    </form>
  );
}

export default ProfileForm;
