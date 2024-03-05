import React, { useEffect, useState } from "react";
import styles from "./mealsContainer.module.scss";
import MealCard from "./MealCard/MealCard";
import { FaPlusCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { calcKcal } from "../../utils/macrosUtils";

function MealsContainer({ data, title }) {
  const [totalKcal, setTotalKcal] = useState(0);

  useEffect(() => {
    setTotalKcal(data.reduce((s, e) => (s += calcKcal(e)), 0));
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles["top"]}>
        <h3>{title}</h3>
        <div className={styles["top-right"]}>
          <p>{totalKcal} of 225 kcal</p>
          <button className={`${styles["btn"]} ${styles["add-btn"]}`}>
            Add
            <IconContext.Provider
              value={{
                style: { height: "1.8rem", width: "1.8rem", cursor: "pointer" },
              }}
            >
              <FaPlusCircle />
            </IconContext.Provider>
          </button>
        </div>
      </div>
      <div className={styles["bottom"]}>
        {data.map((ele, ind) => {
          return <MealCard key={ind} data={ele} />;
        })}
      </div>
    </div>
  );
}

export default MealsContainer;
