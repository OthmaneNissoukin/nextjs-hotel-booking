import { signIn } from "@/auth";
import styles from "./styles.module.css";

function OAuthProviderButtons() {
  return (
    <div>
      <div className={styles.orDivider}>
        <span>or</span>
      </div>
      <div className={styles.authProviders}>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/account/history" });
          }}
        >
          <button className={styles.googleButton}>
            <img src="https://authjs.dev/img/providers/google.svg" alt="Google logo" height="24" width="24" />
            <span>Continue with Google</span>
          </button>
        </form>

        <form
          action={async () => {
            "use server";
            await signIn("facebook", { redirectTo: "/account/history" });
          }}
        >
          <button className={styles.facebookBtn}>
            <i className={styles.facebookIcon}></i>
            Continue with Facebook
          </button>
        </form>
      </div>
    </div>
  );
}

export default OAuthProviderButtons;
