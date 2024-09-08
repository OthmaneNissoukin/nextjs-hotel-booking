import styles from "./styles.module.css";
import Heading from "@/app/_ui/Heading";
import ProfileForm from "./_components/ProfileForm";
import { auth } from "@/auth";

async function Profile() {
  const session = await auth();

  return (
    <>
      <Heading textClassName={styles.heading}>Edit Profile</Heading>
      <ProfileForm user={session.user} />
    </>
  );
}

export default Profile;
