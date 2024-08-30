"use client";
import { faBars, faClose, faCross } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import fa_styles from "@fortawesome/fontawesome-svg-core/styles.css";
import { useState } from "react";

function Navbar() {
  const [hideMenu, setHideMenu] = useState(true);
  return (
    <header>
      <div className="container header-items">
        <h2>LOGO</h2>
        <nav className={`navbar ${hideMenu ? "hide-menu" : "show-menu"}`}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/rooms">Rooms</Link>
            </li>
            <li>About</li>
            <li>Contact</li>
            <li>
              <a href="#">Guest Area</a>
            </li>
          </ul>
        </nav>
        <button onClick={() => setHideMenu(!hideMenu)} className="toggle-menu-button">
          <FontAwesomeIcon icon={hideMenu ? faBars : faClose} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
