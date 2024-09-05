import styles from "./styles.module.css";

function SigninForm() {
  return (
    <div className={`${styles.formSection} container`}>
      <form action="" className={styles.form}>
        <h2 className={styles.loginHeading}>Login</h2>
        <div className={styles.formControl}>
          <label htmlFor="" className={styles.loginLabel}>
            Email Address
          </label>
          <input type="email" className={styles.loginInput} />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="" className={styles.loginLabel}>
            Password
          </label>
          <input type="password" className={styles.loginInput} />
        </div>

        <button type="button" className={styles.formButton}>
          Sign In
        </button>
        <br />
        <a href="#">Forget Password?</a>
      </form>

      {/* AUTH PROVIDERS */}
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
    </div>
  );
}

export default SigninForm;
