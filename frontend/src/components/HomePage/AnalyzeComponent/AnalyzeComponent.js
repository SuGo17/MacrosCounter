import React from "react";
import styles from "./analyzeComtainer.module.scss";
import { useSelector } from "react-redux";
import { selectMeals } from "../../../reducers/mealReducer";
import { mealCalcKcal } from "../../../utils/macrosUtils";
import { selectUserDetails } from "../../../reducers/userReducer";

const calcSelectedMacro = (meals, macroName, calories) => {
  let refKcal = { protein: 4, carbohydrates: 4, fat: 4, fiber: 1 };
  let refPercent = { protein: 20, carbohydrates: 50, fat: 30 };
  let refQty =
    macroName === "fiber" ? 30 : (calories * refPercent[macroName]) / 100;
  let macroValues = meals.map(
    (ele) => (ele.macro[macroName] * ele.qty) / ele.macro.qty
  );
  return (
    ((macroValues.reduce((s, ele) => (s += ele), 0) * refKcal[macroName]) /
      refQty) *
    100
  ).toFixed(1);
};

function AnalyzeComponent() {
  const meals = useSelector(selectMeals);
  const { calories: totalKcal } = useSelector(selectUserDetails);
  return (
    <div className={styles["container"]}>
      <div className={styles["kcal"]}>
        <p className={styles["consumed"]}>
          {meals.reduce((s, ele) => (s += mealCalcKcal(ele, ele["qty"])), 0)}
        </p>
        <div className={styles["divider"]}></div>
        <p className={styles["total"]}>
          {totalKcal || 0} <span>Calories</span>
        </p>
      </div>
      <div className={styles["macros"]}>
        <div className={styles["card"]}>
          <p className={styles["title"]}>Protein</p>
          <div className={styles["range"]}>
            <div
              className={styles["range-val"]}
              style={{
                width: calcSelectedMacro(meals, "protein", totalKcal) + "%",
              }}
            ></div>
          </div>
        </div>
        <div className={styles["card"]}>
          <p className={styles["title"]}>Carbohydrates</p>
          <div className={styles["range"]}>
            <div
              className={styles["range-val"]}
              style={{
                width:
                  calcSelectedMacro(meals, "carbohydrates", totalKcal) + "%",
              }}
            ></div>
          </div>
        </div>
        <div className={styles["card"]}>
          <p className={styles["title"]}>Fat</p>
          <div className={styles["range"]}>
            <div
              className={styles["range-val"]}
              style={{
                width: calcSelectedMacro(meals, "fat", totalKcal) + "%",
              }}
            ></div>
          </div>
        </div>
        <div className={styles["card"]}>
          <p className={styles["title"]}>Fiber</p>
          <div className={styles["range"]}>
            <div
              className={styles["range-val"]}
              style={{
                width: calcSelectedMacro(meals, "fiber", totalKcal) + "%",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyzeComponent;
