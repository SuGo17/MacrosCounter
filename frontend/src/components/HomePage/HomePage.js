import React, { useState } from "react";
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
import { selectLoading as selectMealLoading } from "../../reducers/mealReducer";
import { selectLoading as selectUserLoading } from "../../reducers/userReducer";
import Loader from "../Loader/Loader";
import AddEditModal from "./AddEditModal/AddEditModal";

function HomePage() {
  const [title, setTitle] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [activeEditData, setActiveEditData] = useState({});
  const [tag, setTag] = useState("");
  const breakfast = useSelector(selectBreakfast);
  const morningSnack = useSelector(selectMorningSnack);
  const lunch = useSelector(selectLunch);
  const eveningSnack = useSelector(selectEveningSnack);
  const dinner = useSelector(selectDinner);
  const mealLoading = useSelector(selectMealLoading);
  const userLoading = useSelector(selectUserLoading);

  return (
    <section className={styles.section}>
      <MealsContainer
        data={breakfast}
        title="Breakfast"
        setTitle={setTitle}
        setOpenModal={setOpenModal}
        setIsEditModal={setIsEditModal}
        setActiveEditData={setActiveEditData}
        setTag={setTag}
      />
      <MealsContainer
        data={morningSnack}
        title="Morning Snack"
        setTitle={setTitle}
        setOpenModal={setOpenModal}
        setIsEditModal={setIsEditModal}
        setActiveEditData={setActiveEditData}
        setTag={setTag}
      />
      <MealsContainer
        data={lunch}
        title="Lunch"
        setTitle={setTitle}
        setOpenModal={setOpenModal}
        setIsEditModal={setIsEditModal}
        setActiveEditData={setActiveEditData}
        setTag={setTag}
      />
      <MealsContainer
        data={eveningSnack}
        title="Evening Snack"
        setTitle={setTitle}
        setOpenModal={setOpenModal}
        setIsEditModal={setIsEditModal}
        setActiveEditData={setActiveEditData}
        setTag={setTag}
      />
      <MealsContainer
        data={dinner}
        title="Dinner"
        setTitle={setTitle}
        setOpenModal={setOpenModal}
        setIsEditModal={setIsEditModal}
        setActiveEditData={setActiveEditData}
        setTag={setTag}
      />

      <AddEditModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={title}
        isEditModal={isEditModal}
        setIsEditModal={setIsEditModal}
        data={activeEditData}
        tag={tag}
      />
      {(mealLoading || userLoading) && <Loader />}
    </section>
  );
}

export default HomePage;
