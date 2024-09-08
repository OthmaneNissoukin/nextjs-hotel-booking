import styles from "./styles.module.css";
import { signIn } from "@/auth";

function SigninForm() {
  async function authAction(formData) {
    "use server";
    const credentials = { email: formData.get("email"), password: formData.get("password") };
    await signIn("credentials", { ...credentials, redirectTo: "/account/history" });
  }

  return (
    <div className={`${styles.formSection} container`}>
      <form action={authAction} className={styles.form}>
        <h2 className={styles.loginHeading}>Login</h2>
        <div className={styles.formControl}>
          <label htmlFor="" className={styles.loginLabel}>
            Email Address
          </label>
          <input type="email" name="email" className={styles.loginInput} />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="" className={styles.loginLabel}>
            Password
          </label>
          <input type="password" name="password" className={styles.loginInput} />
        </div>

        <button className={styles.formButton}>Sign In</button>
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
