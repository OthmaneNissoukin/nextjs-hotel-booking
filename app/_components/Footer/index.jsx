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
          </ul>
        </div>

        <div>
          <h3>Link Menu</h3>
          <ul>
            <li>Homepage</li>
            <li>Rooms</li>
            <li>Blog</li>
            <li>Contact Us</li>
            <li>About</li>
          </ul>
        </div>

        <div>
          <h3>Newsletter</h3>
          <li>Form Will Be</li>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
