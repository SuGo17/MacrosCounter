import React from "react";
import styles from "./modal.module.scss";
import { IoCloseSharp } from "react-icons/io5";
import { IconContext } from "react-icons";

function Modal({
  children,
  title,
  openModal = false,
  setOpenModal,
  classes,
  showHeader = true,
}) {
  return (
    <>
      {openModal && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setOpenModal(false)}
          ></div>
          <div className={`${styles.modal} ${classes ? classes : ""}`}>
            {showHeader && <div className={styles["mobile-icon"]}></div>}
            {showHeader && (
              <div className={styles["modal-header"]}>
                <p>{title}</p>
                <IconContext.Provider
                  value={{
                    style: { height: "3rem", width: "3rem", cursor: "pointer" },
                  }}
                >
                  <IoCloseSharp onClick={() => setOpenModal(false)} />
                </IconContext.Provider>
              </div>
            )}
            <div className={`${styles.modalContent} `}>{children}</div>
          </div>
        </>
      )}
    </>
  );
}

export default Modal;
