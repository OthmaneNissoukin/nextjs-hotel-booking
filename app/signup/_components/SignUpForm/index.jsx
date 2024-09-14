import { authAction, signupAction } from "@/app/_lib/actions";
import CredentialsForm from "../CredentialsForm";
import styles from "./styles.module.css";
import OAuthProviderButtons from "@/app/signin/_components/OAuthProviderButtons";

function SignUpForm() {
  return (
    <div className={`${styles.formSection} container`}>
      <CredentialsForm registerAction={signupAction} authAction={authAction} />

      <OAuthProviderButtons />
    </div>
  );
}

export default SignUpForm;
