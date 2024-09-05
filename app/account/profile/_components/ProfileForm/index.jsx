"use client";

import SubmitButton from "@/app/_ui/SubmitButton";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { getGuestById, updateGuest } from "@/app/_lib/supabase/guests";
import { redirect } from "next/navigation";
import Loader from "@/app/_ui/Loader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guest, setGuest] = useState(null);
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getGuest() {
      setIsLoading(true);
      const guest = await getGuestById(1);
      setIsLoading(false);

      // TODO: FIND A WAY TO REDIRECT WITHOUT HARD REFRESH
      if (!guest) redirect("signin");

      console.log(guest);

      setGuest(guest.at(0));
      setFullname(guest.at(0).fullname);
      setPhone(guest.at(0).phone);
      setNationality(guest.at(0).nationality);
      setEmail(guest.at(0).email);
    }

    getGuest();
  }, []);

  async function handleUpdate() {
    // TODO: ADD FORM VALIDATION FOR ALL FIELDS
    // TODO: STYLE THE TOSTSIFY COMPONENT
    setIsSubmitting(true);
    const updateData = await updateGuest(1, fullname, nationality, phone, email);
    if (updateData) toast("Updated Successfuly!");
    else toast("Failed to update!");
    setIsSubmitting(false);
  }

  if (isLoading)
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    );

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={styles.profileFormInputs}>
        <div>
          <label className={styles.formLabel}>Fullname</label>
          <input
            className={styles.formControl}
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            type="text"
            placeholder="Alaoui Hassan"
          />
        </div>
        <div>
          <label className={styles.formLabel}>Email Address</label>
          <input
            className={styles.formControl}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="john.doe@mail.com"
          />
        </div>
        <div>
          <label className={styles.formLabel}>Nationality</label>
          <input
            className={styles.formControl}
            onChange={(e) => setNationality(e.target.value)}
            value={nationality}
            type="text"
            placeholder="Moroccan"
          />
        </div>
        <div>
          <label className={styles.formLabel}>Phone Number</label>
          <input
            className={styles.formControl}
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="tel"
            placeholder="+212 6 879900830"
          />
        </div>
      </div>
      <div className={styles.formButtonContainer}>
        <SubmitButton onClick={handleUpdate} className={styles.formButton} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </SubmitButton>
      </div>
      <ToastContainer />
    </form>
  );
}

export default ProfileForm;
