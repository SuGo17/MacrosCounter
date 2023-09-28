import React from "react";
import styles from "./join.module.scss";
import "./join.module.scss";
import { NavLink, Outlet } from "react-router-dom";

function Join() {
  let activeStyles = (isActive, arr) => {
    return !isActive
      ? arr.join(" ")
      : [...arr, styles["active-link"]].join(" ");
  };
  return (
    <section className={styles["join-section"]}>
      <div className={styles["join-container"]}>
        <div className={styles["links"]}>
          <NavLink
            className={({ isActive }) =>
              activeStyles(isActive, [styles["login"], styles["link-btn"]])
            }
            to="/join/login"
          >
            LOGIN
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              activeStyles(isActive, [styles["signup"], styles["link-btn"]])
            }
            to="/join/signup"
          >
            SIGNUP
          </NavLink>
        </div>
        <Outlet />
      </div>
    </section>
  );
}

export default Join;
