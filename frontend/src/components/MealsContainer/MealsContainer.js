import React, { useEffect, useMemo, useState } from "react";
import styles from "./mealsContainer.module.scss";
import MealCard from "./MealCard/MealCard";
import { FaPlusCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { calcKcal } from "../../utils/macrosUtils";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../reducers/userReducer";

function MealsContainer({
  data,
  title,
  setOpenModal,
  setTitle,
  setIsEditModal,
  setActiveEditData,
}) {
  const [totalKcal, setTotalKcal] = useState(0);
  const [targetKcal, setTargetKcal] = useState(0);
  const { calories } = useSelector(selectUserDetails);

  const kCalPerMeal = useMemo(() => {
    return {
      Breakfast: 25,
      "Morning Snack": 12.5,
      Lunch: 25,
      "Evening Snack": 12.5,
      Dinner: 25,
    };
  }, []);

  useEffect(() => {
    setTotalKcal(data.reduce((s, e) => (s += calcKcal(e, e.qty)), 0));
  }, [data]);

  useEffect(() => {
    title && setTargetKcal(calories * (kCalPerMeal[title] / 100));
  }, [calories, kCalPerMeal, title]);

  const handleClick = () => {
    setTitle(title);
    setOpenModal(true);
    setIsEditModal(false);
    setActiveEditData({});
  };

  return (
    <div className={styles.container}>
      <div className={styles["top"]}>
        <h3>{title}</h3>
        <div className={styles["top-right"]}>
          <p>
            {totalKcal} of {targetKcal} kcal
          </p>
          <button
            className={`${styles["btn"]} ${styles["add-btn"]}`}
            onClick={handleClick}
          >
            <p>Add</p>
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
          return (
            <MealCard
              key={ind}
              data={ele}
              setIsEditModal={setIsEditModal}
              setActiveEditData={setActiveEditData}
              setOpenModal={setOpenModal}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MealsContainer;
