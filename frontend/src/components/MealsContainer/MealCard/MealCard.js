import React, { useEffect, useRef, useState } from "react";
import styles from "./mealCard.module.scss";
import { SlOptionsVertical } from "react-icons/sl";
import { IconContext } from "react-icons";
import { calcKcal } from "../../../utils/macrosUtils";

function MealCard({ data }) {
  const [posData, setPosData] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef();

  useEffect(() => {
    console.log(data);
    const handleClickOutside = (e) => {
      if (!optionsRef?.current?.contains(e.target)) {
        setShowOptions(false);
      }
    };
    const handleScroll = () => {
      setShowOptions(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

  return (
    <div className={styles.card}>
      <div className={styles["left"]}>
        <p className={styles["title"]}>{data.name}</p>
        <p className={styles["qty"]}>{data.qty} g</p>
      </div>
      <p className={styles["kcal"]}>{calcKcal(data)} kcal</p>
      <IconContext.Provider
        value={{
          style: {
            height: "1.8rem",
            width: "1.8rem",
            cursor: "pointer",
            position: "relative",
          },
        }}
      >
        <SlOptionsVertical
          className="options"
          onClick={(e) => {
            setShowOptions(true);
            console.log(e.target.getClientRects()[0]);
            setPosData({
              left: e.target.getClientRects()[0].left - 43.65,
              top: e.target.getClientRects()[0].top + 30,
            });
          }}
        />
      </IconContext.Provider>
      {showOptions && (
        <div
          className={`options ${styles.options}`}
          style={{ left: posData.left, top: posData.top }}
          ref={optionsRef}
        >
          <p>Edit</p>
          <p>Delete</p>
        </div>
      )}
    </div>
  );
}

export default MealCard;
