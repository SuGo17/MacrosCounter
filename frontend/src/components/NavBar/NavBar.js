import React, { useState } from "react";
import styles from "./navbar.module.scss";
import { IoClose, IoMenu } from "react-icons/io5";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

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
        <Link to="/" className="logo">
          Macros Counter
        </Link>
      </div>

      <div
        className={`${styles["nav-right"]} ${menu && styles["nav-active"]}`}
        data-testid="menu-list"
      >
        <ul className={styles["signin"]}>
          <li className={styles["navlinks"]}>
            <Link to="/join/login">LOGIN</Link>
          </li>
          <li className={styles["navlinks"]}>
            <Link to="/join/signup">SIGNUP</Link>
          </li>
        </ul>

        <ul className={styles["admin"]}>
          <li className={styles["navlinks"]}>
            <Link to="/admins">Admins</Link>
          </li>
          <li className={styles["navlinks"]}>
            <Link to="/users">USERS</Link>
          </li>
        </ul>

        <ul className={styles["loggedIn"]}>
          <li className={styles["navlinks"]}>
            <Link to="/profile">PROFILE</Link>
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
      <div
        className={styles["menu"]}
        onClick={handleMenuClick}
        data-testid="menu"
      >
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