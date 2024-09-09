import { authAction } from "@/app/_lib/actions";
import CredentialsForm from "../CredentialsForm";
import OAuthProviderButtons from "../OAuthProviderButtons";
import styles from "./styles.module.css";

function SigninForm() {
  return (
    <div className={`${styles.formSection} container`}>
      <CredentialsForm authAction={authAction} />

      <OAuthProviderButtons />
    </div>
  );
}

export default SigninForm;
