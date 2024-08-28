"use client";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";
import { useState, createContext, cloneElement, useContext, useEffect } from "react";

const ModalContext = createContext();

function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return <ModalContext.Provider value={{ isOpen, open, close }}>{children}</ModalContext.Provider>;
}

function Overlay({ children }) {
  const { isOpen } = useContext(ModalContext);

  return (
    <>
      {isOpen
        ? createPortal(
            <div className={styles.modalOverlay}>{children}</div>,
            typeof window !== "undefined" ? document.body : null
          )
        : null}
    </>
  );
}

function Heading({ children }) {
  return <h2>{children}</h2>;
}

function ToggleOpen({ children }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: open });
}

function Wrapper({ children }) {
  return <div className={styles.modalWrapper}>{children}</div>;
}

function ToggleClose({ children }) {
  const { close } = useContext(ModalContext);
  return cloneElement(children, { onClick: close });
}

Modal.Heading = Heading;
Modal.ToggleOpen = ToggleOpen;
Modal.Wrapper = Wrapper;
Modal.Overlay = Overlay;
Modal.ToggleClose = ToggleClose;

export default Modal;
