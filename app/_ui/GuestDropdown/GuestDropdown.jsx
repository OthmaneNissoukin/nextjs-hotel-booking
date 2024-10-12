import React, { useState } from "react";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const GuestDropdown = ({ user, signOutAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e) => {
    if (e.target.closest(`.${styles.avatarContainer}`)) return;
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className={styles.avatarContainer} onClick={toggleDropdown}>
      <img
        src={
          user.image
            ? user.image
            : `https://ui-avatars.com/api/?name=${user.name.replace(" ", "+")}&background=161616&color=F1F1F1`
        }
        alt={`${user.name} avatar`}
        className={styles.avatar}
      />
      <span className={styles.name}>
        <FontAwesomeIcon icon={faCaretDown} />
      </span>
      <div className={`${styles.dropdown} ${isOpen ? styles.active : ""}`}>
        <div className={styles.dropdownItem}>
          <Link className={styles.dropdownOption} href="/account/history">
            History
          </Link>
        </div>
        <div className={styles.dropdownItem}>
          <Link className={styles.dropdownOption} href="/account/profile">
            Profile
          </Link>
        </div>
        <div className={styles.dropdownItem}>
          <form action={signOutAction}>
            <button type="submit" className={styles.dropdownOption}>
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GuestDropdown;
