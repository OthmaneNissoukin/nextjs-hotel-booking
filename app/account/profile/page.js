import styles from "./styles.module.css";
import Heading from "@/app/_ui/Heading";
import ProfileForm from "./_components/ProfileForm";

function Profile() {
  return (
    <>
      <Heading textClassName={styles.heading}>Edit Profile</Heading>
      <ProfileForm />
    </>
  );
}

export default Profile;
