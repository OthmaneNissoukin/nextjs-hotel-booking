import styles from "./styles.module.css";
import Heading from "@/app/_ui/Heading";
import ProfileForm from "./_components/ProfileForm";
import { auth } from "@/auth";
import { getGuestById, updateGuest } from "@/app/_lib/supabase/guests";
import { revalidatePath } from "next/cache";
import { profileSchema } from "@/app/_lib/zodSchemas";

export const metadata = {
  title: "My Profile",
  description: "View and Edit your profile details",
};

async function Profile() {
  const session = await auth();

  const user = await getGuestById(session.user.id);
  console.log(user);

  if (!user) redirect("signin");

  async function guestUpdateAction(prevState, formData) {
    "use server";
    // TODO: ADD FORM VALIDATION FOR ALL FIELDS
    // TODO: STYLE THE TOSTSIFY COMPONENT

    prevState = {};
    const guestID = user.id;
    const fullname = formData.get("fullname");
    const nationalityWithFlag = formData.get("nationality");
    const email = formData.get("email");
    const phone = formData.get("phone");

    // if (fullname.length < 3) {
    //   return { ...prevState, fullnameErr: "Fullname must be at least 3 characters" };
    // }

    try {
      const z_validation = profileSchema.parse({ fullname, email, phone, nationality: nationalityWithFlag });
      console.log(z_validation);
    } catch (err) {
      console.log("Caugth Validation");
      console.log(err.errors);
      err.errors.forEach((element) => {
        prevState[element?.path[0] ?? "unknown"] = element.message;
      });
      return { ...prevState };
    }

    const [nationality, countryFlag] = nationalityWithFlag.split("%");

    const updateData = await updateGuest(guestID, fullname, nationality, countryFlag, phone, email);

    // REVALIDATE THE DATA FOR THE CACHE
    revalidatePath("/account/profile");
  }

  return (
    <>
      <Heading textClassName={styles.heading}>Edit Profile</Heading>
      <ProfileForm guestUpdateAction={guestUpdateAction} guest={user} />
    </>
  );
}

export default Profile;
