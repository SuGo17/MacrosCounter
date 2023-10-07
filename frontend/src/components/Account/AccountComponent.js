import React from "react";
import styles from "./accountComponent.module.scss";
import { NavLink, Outlet } from "react-router-dom";
import pic from "../../images/1326575.png";

function AccountComponent() {
  return (
    <section className={styles["section"]}>
      <div className={styles["container"]}>
        <div className={styles["left-menu"]}>
          <div className={styles["profile-img"]}>
            <img src={pic} alt="profile-pic" className={styles.img} />
          </div>
          <ul className={styles["links"]}>
            <li className={styles["link"]}>
              <NavLink
                className={({ isActive }) => {
                  if (isActive) return styles["active-link"];
                }}
                to="/account/profile"
              >
                Profile
              </NavLink>
            </li>
            <li className={styles["link"]}>
              <NavLink
                className={({ isActive }) => {
                  if (isActive) return styles["active-link"];
                }}
                to="/account/change-password"
              >
                Change Password
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles["right-content"]}>
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default AccountComponent;
