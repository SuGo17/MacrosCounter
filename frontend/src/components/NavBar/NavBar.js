import React, { useState } from "react";
import styles from "./navbar.module.scss";
import { IoClose, IoMenu } from "react-icons/io5";
import { IconContext } from "react-icons";
// import { useSearchParams } from "react-router-dom";

function NavBar() {
  const dateFormatter = (d) => {
    const newDate = new Date(d);
    return `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${newDate.getDate().toString().padStart(2, "0")}`;
  };
  const [menu, setMenu] = useState(false);
  const [activeDate, setActiveDate] = useState(dateFormatter(new Date()));
  const handleMenuClick = () => {
    setMenu((prev) => !prev);
  };

  return (
    <nav className={styles["nav-bar"]}>
      <div className={styles["nav-left"]}>
        <a href="/" className="logo">
          Macros Counter
        </a>
      </div>

      <div className={`${styles["nav-right"]} ${menu && styles["nav-active"]}`}>
        <ul className={styles["signin"]}>
          <li className={styles["navlinks"]}>
            <a href="/join/login">LOGIN</a>
          </li>
          <li className={styles["navlinks"]}>
            <a href="/join/signup">SIGNUP</a>
          </li>
        </ul>

        <ul className={styles["admin"]}>
          <li className={styles["navlinks"]}>
            <a href="/admins">Admins</a>
          </li>
          <li className={styles["navlinks"]}>
            <a href="/users">USERS</a>
          </li>
        </ul>

        <ul className={styles["loggedIn"]}>
          <li className={styles["navlinks"]}>
            <a href="/profile">PROFILE</a>
          </li>
          <li className={styles["navlinks"]}>
            <a href="/">LOGOUT</a>
          </li>
        </ul>

        <ul className={styles["date"]}>
          <li className={styles["navlinks"]}>
            <input
              type="date"
              data-testid="date-picker"
              max={dateFormatter(new Date())}
              value={activeDate}
              onChange={(e) =>
                setActiveDate(e.target.value || dateFormatter(new Date()))
              }
            />
          </li>
        </ul>
      </div>
      <div className={styles["menu"]} onClick={handleMenuClick}>
        <IconContext.Provider
          value={{
            style: { height: "3rem", width: "3rem", cursor: "pointer" },
          }}
        >
          {!menu ? <IoMenu /> : <IoClose />}
        </IconContext.Provider>
      </div>
    </nav>
  );
}

export default NavBar;
