import React from "react";
import styles from "./homepage.module.scss";
import MealsContainer from "../MealsContainer/MealsContainer";
import { useSelector } from "react-redux";
import {
  selectBreakfast,
  selectDinner,
  selectEveningSnack,
  selectLunch,
  selectMorningSnack,
} from "../../reducers/mealReducer";

function HomePage() {
  const breakfast = useSelector(selectBreakfast);
  const morningSnack = useSelector(selectMorningSnack);
  const lunch = useSelector(selectLunch);
  const eveningSnack = useSelector(selectEveningSnack);
  const dinner = useSelector(selectDinner);
  return (
    <section className={styles.section}>
      <MealsContainer data={breakfast} title="Breakfast" />
      <MealsContainer data={morningSnack} title="Morning Snack" />
      <MealsContainer data={lunch} title="Lunch" />
      <MealsContainer data={eveningSnack} title="Evening Snack" />
      <MealsContainer data={dinner} title="Dinner" />
    </section>
  );
}

export default HomePage;
