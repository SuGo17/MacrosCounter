import React from "react";
import styles from "./navbar.module.scss";
import { IoMenu } from "react-icons/io5";
import { IconContext } from "react-icons";

function NavBar() {
  return (
    <nav className={styles["nav-bar"]}>
      <div className={styles["nav-left"]}>
        <a href="/" className="logo">
          Macros Counter
        </a>
      </div>

      <div className={styles["nav-right"]}>
        <ul className={styles["loggedIn"]}>
          <li className={styles["navlinks"]}>
            <a href="/profile">PROFILE</a>
          </li>
          <li className={styles["navlinks"]}>
            <a href="/" className={styles["logout-btn"]}>
              LOGOUT
            </a>
          </li>
        </ul>

        <ul className={styles["singIn"]}>
          <li className={styles["navlinks"]}>
            <a href="/join/login">LOGIN</a>
          </li>
          <li className={styles["navlinks"]}>
            <a href="/join/signup">SIGNUP</a>
          </li>
        </ul>

        <ul className={styles["admin"]}>
          <li className={styles["navlinks"]}>
            <a href="/users">USERS</a>
          </li>
          <li className={styles["navlinks"]}>
            <a href="/admins">Admins</a>
          </li>
        </ul>

        <ul className={styles["logout"]}>
          <li className={styles["navlinks"]}>
            <input type="date" />
          </li>
        </ul>
        <ul className={styles["menu"]}>
          <li className={styles["navlinks"]}>
            <IconContext.Provider
              value={{
                style: { height: "3rem", width: "3rem", cursor: "pointer" },
              }}
            >
              <IoMenu />
            </IconContext.Provider>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
