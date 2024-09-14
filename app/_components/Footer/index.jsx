import Link from "next/link";
import styles from "./styles.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={`${styles.footerMenu} container`}>
        <div>
          <h3>Contact Us</h3>
          <ul>
            <li>email@gmail.com</li>
            <li>+212 6 77 88 99 00</li>
            <li>XYZ Street Agadir</li>
            <li className={styles.icons}></li>
          </ul>
        </div>

        <div>
          <h3>Link Menu</h3>
          <ul>
            <li>
              <Link href="/">Homepage</Link>
            </li>
            <li>
              <Link href="/rooms">Rooms</Link>
            </li>

            {/* <li>Blog</li> */}
            <li>
              <Link href={"/contact"}>Contact Us</Link>
            </li>

            <li>
              <Link href="/signin">Guest Area</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Subscribe To Our Newsletter</h3>
          <li className={styles.newsletter}>
            <input type="text" placeholder="example@mail.com" />
            <button>SUBMIT</button>
          </li>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
