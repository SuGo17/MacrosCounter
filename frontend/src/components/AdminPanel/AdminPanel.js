import React from "react";
import styles from "./adminpanel.module.scss";
import { Link } from "react-router-dom";
import userIcon from "../../images/users.png";
import macrosIcon from "../../images/macros.png";
import feedbackIcon from "../../images/feedback.png";

function AdminPanel() {
  const data = [
    { to: "/users", src: userIcon, title: "Users" },
    { to: "/macros", src: macrosIcon, title: "Macros" },
    { to: "/feedback", src: feedbackIcon, title: "Feedback" },
  ];
  return (
    <section className={styles["section"]}>
      <div className={styles.content}>
        {data.map((ele, index) => {
          return (
            <Link className={styles.card} to={ele.to} key={index}>
              <img src={ele.src} alt={ele.title} />
              <p>{ele.title}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default AdminPanel;
