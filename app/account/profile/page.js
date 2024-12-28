import styles from "./styles.module.css";
import Heading from "@/app/_ui/Heading";
import ProfileForm from "./_components/ProfileForm";
import { auth } from "@/auth";
import { getGuestById, updateGuest, updateGuestWithPwd } from "@/app/_lib/supabase/guests";
import { revalidatePath } from "next/cache";
import { profileSchema } from "@/app/_lib/zodSchemas";
import { hashSync } from "bcryptjs";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Profile",
  description: "View and Edit your profile details",
};

async function Profile() {
  const session = await auth();
  if (!session) redirect("/signin");

  const user = await getGuestById(session?.user.id);
  const supabaseAccessToken = session?.supabaseAccessToken;

  if (!user) redirect("/signin");

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
    const password = formData.get("password");
    const confirm_password = formData.get("confirm_password");

    // if (fullname.length < 3) {
    //   return { ...prevState, fullnameErr: "Fullname must be at least 3 characters" };
    // }

    try {
      const z_validation = profileSchema.parse({
        fullname,
        email,
        phone,
        nationality: nationalityWithFlag,
      });
    } catch (err) {
      console.log("Caugth Validation");
      console.log(err.errors);
      err.errors.forEach((element) => {
        prevState[element?.path[0] ?? "unknown"] = element.message;
      });
      return { ...prevState };
    }

    const [nationality, countryFlag] = nationalityWithFlag.split("%");

    if (password.trim() || confirm_password.trim()) {
      if (password.length < 6) return { ...prevState, password: "Password must be at least 6 characters" };
      if (password != confirm_password)
        return {
          ...prevState,
          password: "Password doesn't match confirmation",
          confirm_password: "Password doesn't match confirmation",
        };

      const hashedPassword = hashSync(password, 10);
      await updateGuestWithPwd(
        session.supabaseAccessToken,
        guestID,
        fullname,
        nationality,
        countryFlag,
        phone,
        email,
        hashedPassword
      );
    } else {
      await updateGuest(supabaseAccessToken, guestID, fullname, nationality, countryFlag, phone, email);
    }

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
