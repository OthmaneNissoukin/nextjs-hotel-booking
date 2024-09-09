import styles from "./styles.module.css";

function OAuthProviderButtons() {
  return (
    <div>
      <div className={styles.orDivider}>
        <span>or</span>
      </div>
      <div className={styles.authProviders}>
        <button className={styles.googleButton}>
          <img src="https://authjs.dev/img/providers/google.svg" alt="Google logo" height="24" width="24" />
          <span>Continue with Google</span>
        </button>

        <button className={styles.facebookBtn}>
          <i className={styles.facebookIcon}></i>
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
}

export default OAuthProviderButtons;
