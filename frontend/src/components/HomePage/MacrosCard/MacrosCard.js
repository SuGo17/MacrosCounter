import React from "react";
import styles from "./macrosContainer.module.scss";

function MacrosCard({ data, onclick }) {
  const { name } = data;
  return (
    <div
      className={styles["card-container"]}
      onClick={() => {
        onclick(data);
      }}
    >
      <p className={styles["title"]}>{name}</p>
    </div>
  );
}

export default MacrosCard;
