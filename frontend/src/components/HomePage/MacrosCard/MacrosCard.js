import React from "react";
import styles from "./macrosContainer.module.scss";

function MacrosCard({ data, onclick }) {
  const { _id, name } = data;
  const { protein, carbohydrates, fat, fiber, qty } = data;
  return (
    <div
      className={styles["card-container"]}
      onClick={() => {
        onclick({
          name,
          macro: { protein, carbohydrates, fat, fiber, qty, _id },
        });
      }}
    >
      <p className={styles["title"]}>{name}</p>
    </div>
  );
}

export default MacrosCard;
