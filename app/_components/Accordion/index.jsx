"use client";

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "./styles.module.css";

function Accordion({ label, className = "", children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`${styles.accordionContainer} ${className}`}>
      <div className={styles.accordionControl}>
        <button className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={isOpen ? faPlus : faMinus} />
        </button>
        <p className={styles.accordionLabel} onClick={() => setIsOpen(!isOpen)}>
          {label}
        </p>
      </div>
      <div className={styles.accordionContent}>{isOpen && children}</div>
    </div>
  );
}

export default Accordion;
