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
          <input type="text" className={styles.loginInput} />
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
    </div>
  );
}

export default SigninForm;
