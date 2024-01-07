import React from "react";
import styles from "./homepage.module.scss";
import MealsContainer from "../MealsContainer/MealsContainer";

function HomePage() {
  const data = [
    { title: "Chicken", qty: "100", kcal: "300" },
    { title: "Banana", qty: "100", kcal: "300" },
    { title: "Egg", qty: "100", kcal: "300" },
  ];
  return (
    <section className={styles.section}>
      <MealsContainer data={data} title="Breakfast" />
      <MealsContainer data={data} title="Morning Snack" />
      <MealsContainer data={data} title="Lunch" />
      <MealsContainer data={data} title="Evening Snack" />
      <MealsContainer data={data} title="Dinner" />
    </section>
  );
}

export default HomePage;
