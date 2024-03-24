import React, { useEffect, useState } from "react";
import styles from "./addEditModal.module.scss";
import Modal from "../../Modal/Modal";
import SearchComponent from "../../FormComponents/SearchComponent/SearchComponent";
import useGetMacros from "../../../hooks/useGetMacros";
import MacrosCard from "../MacrosCard/MacrosCard";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { toastOptions } from "../../../reducers/userReducer";
import { IconContext } from "react-icons";
import { IoArrowBackSharp, IoCloseSharp } from "react-icons/io5";
import mealImage from "../../../images/meal-img.jpg";
import { mealCalcKcal } from "../../../utils/macrosUtils";
import proteinIcon from "../../../images/protein.png";
import carbsIcon from "../../../images/carbohydrates.png";
import fatIcon from "../../../images/fat.png";
import fiberIcon from "../../../images/fiber.png";
import { addMeal, editMeal, selectDate } from "../../../reducers/mealReducer";
import { useDispatch, useSelector } from "react-redux";

const calcMacroQty = (macro, qty, refQty) => {
  let val = (macro * qty) / refQty;
  return val.toFixed(1) || 0;
};

function AddEditModal({
  openModal,
  setOpenModal,
  title,
  isEditModal = false,
  data,
  tag,
}) {
  const [value, setValue] = useState({
    "addModal-search1": "",
  });
  const [macros, setMacros] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeAddEditData, setActiveAddEditData] = useState({});
  const [mealQty, setMealQty] = useState(data.qty || 0);
  const [showHeader, setShowHeader] = useState(
    !isEditModal || !showDetailsModal
  );

  const dispatch = useDispatch();
  const activeDate = useSelector(selectDate);
  const getMacrosSearch = useGetMacros();

  useEffect(() => {
    isEditModal && openModal && data && setActiveAddEditData(data);
    data && data.qty && setMealQty(data.qty);
    return () => {
      setMealQty(0);
      setValue({ "addModal-search1": "" });
      !openModal && setShowDetailsModal(false);
      !openModal && setActiveAddEditData({});
    };
  }, [data, isEditModal, openModal]);

  useEffect(() => {
    if (!openModal) return;
    setLoading(true);
    const macroTimeout = setTimeout(async () => {
      const { res, error } = await getMacrosSearch(value["addModal-search1"]);
      setMacros(res["all_ingredients"] || []);
      setError(error);
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(macroTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    error && toast.error("Unable to fetch macros.", toastOptions);
  }, [error]);

  useEffect(() => {
    showDetailsModal || isEditModal
      ? setShowHeader(false)
      : setShowHeader(true);
  }, [showDetailsModal, isEditModal]);

  const handleMacroCardClick = (addEditata) => {
    setShowDetailsModal(true);
    setActiveAddEditData(addEditata);
  };

  const handleMealQtyDecrement = () => {
    mealQty > 0 && setMealQty((prev) => +prev - 1);
  };

  const handleinputChange = (e) => {
    let inp = e.target.value;
    if (inp === "") return setMealQty(0);
    const pattern = /^-?\d*\.?\d+$/;
    if (pattern.test(e.target.value)) {
      setMealQty(+inp);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditModal) {
      activeAddEditData &&
        dispatch(
          addMeal({
            date: activeDate,
            tag,
            macro_id: activeAddEditData.macro["_id"],
            qty: mealQty,
          })
        );
      setOpenModal(false);
    } else {
      activeAddEditData &&
        dispatch(
          editMeal({
            _id: activeAddEditData._id,
            qty: mealQty,
          })
        );
      setOpenModal(false);
    }
  };

  return (
    <div className={styles.container}>
      <Modal
        title={`${isEditModal ? "Edit" : "Add"} ${title} Meal`}
        showHeader={showHeader}
        openModal={openModal}
        setOpenModal={setOpenModal}
        classes={`${styles["min-height-50"]} ${
          (showDetailsModal || isEditModal) && styles["padding-0"]
        }`}
      >
        {!isEditModal && !showDetailsModal && (
          <div className={styles["add-modal"]}>
            <form>
              <SearchComponent
                data={{ id: "addModal-search1", placeholder: "Search Meal" }}
                value={value}
                setValue={setValue}
              />
            </form>
            <h3 className={styles["heading"]}>Top Results:</h3>
            <div
              className={`${styles["macros-container"]} ${
                loading && styles["center-align"]
              }`}
            >
              {!loading &&
                (macros.length
                  ? macros.map((ele) => (
                      <MacrosCard
                        key={ele._id}
                        data-macro-id={ele._id}
                        data={ele}
                        onclick={handleMacroCardClick}
                      />
                    ))
                  : value["addModal-search1"] && <p>No results found.</p>)}
              {loading && (
                <TailSpin
                  height="50"
                  width="50"
                  color="#df2e38"
                  ariaLabel="tailspin-loading"
                  visible={true}
                />
              )}
            </div>
          </div>
        )}
        {(isEditModal || showDetailsModal) && (
          <div className={styles["edit-modal"]}>
            <div
              className={`${styles["top"]} ${
                isEditModal ? styles["justify-flex-end"] : ""
              }`}
            >
              {!isEditModal && (
                <div className={styles["left"]}>
                  <IconContext.Provider
                    value={{
                      style: {
                        height: "3rem",
                        width: "3rem",
                        cursor: "pointer",
                        color: "#fff",
                      },
                    }}
                  >
                    <IoArrowBackSharp
                      onClick={() => setShowDetailsModal(false)}
                    />
                  </IconContext.Provider>
                </div>
              )}
              <div className={styles["right"]}>
                <IconContext.Provider
                  value={{
                    style: {
                      height: "3rem",
                      width: "3rem",
                      cursor: "pointer",
                      color: "#fff",
                    },
                  }}
                >
                  <IoCloseSharp onClick={() => setOpenModal(false)} />
                </IconContext.Provider>
              </div>
            </div>
            <div className={styles["content"]}>
              <div className={styles["img"]}>
                <img src={mealImage} alt="Meal" />
                <p className={styles["name"]}>{activeAddEditData?.name}</p>
                <p className={styles["qty"]}>{`Quantity: ${
                  mealQty || 0
                } g - ${mealCalcKcal(activeAddEditData, mealQty)} kcal`}</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className={styles["container"]}>
                  <p className={styles["qty-label"]}>Pick the quantity:</p>
                  <div className={styles["macro-input"]}>
                    <div>
                      <button
                        className={`${styles.btn} ${styles["qty-update-button"]}`}
                        onClick={handleMealQtyDecrement}
                        type="button"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={mealQty}
                        onChange={handleinputChange}
                      />
                      <button
                        className={`${styles.btn} ${styles["qty-update-button"]}`}
                        onClick={() => setMealQty((prev) => +prev + 1)}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                    <p className={styles["unit"]}>Grams</p>
                  </div>

                  <div className={styles["macro-container"]}>
                    <p className={styles["title"]}>Macronutrients Breakdown:</p>

                    <div className={styles["macros-breakdown"]}>
                      <div className={styles["card"]}>
                        <p className={styles["macro-title"]}>Protein</p>
                        <div className={styles["img"]}>
                          <img src={proteinIcon} alt="Fiber" />
                        </div>
                        <p className={styles["macro-qty"]}>
                          {calcMacroQty(
                            activeAddEditData?.macro?.protein,
                            mealQty,
                            activeAddEditData?.macro?.qty
                          )}{" "}
                          g
                        </p>
                      </div>
                      <div className={styles["card"]}>
                        <p className={styles["macro-title"]}>Carbs</p>
                        <div className={styles["img"]}>
                          <img src={carbsIcon} alt="Fiber" />
                        </div>
                        <p className={styles["macro-qty"]}>
                          {calcMacroQty(
                            activeAddEditData?.macro?.carbohydrates,
                            mealQty,
                            activeAddEditData?.macro?.qty
                          )}{" "}
                          g
                        </p>
                      </div>
                      <div className={styles["card"]}>
                        <p className={styles["macro-title"]}>Fats</p>
                        <div className={styles["img"]}>
                          <img src={fatIcon} alt="Fiber" />
                        </div>
                        <p className={styles["macro-qty"]}>
                          {calcMacroQty(
                            activeAddEditData?.macro?.fat,
                            mealQty,
                            activeAddEditData?.macro?.qty
                          )}{" "}
                          g
                        </p>
                      </div>
                      <div className={styles["card"]}>
                        <p className={styles["macro-title"]}>Fiber</p>
                        <div className={styles["img"]}>
                          <img src={fiberIcon} alt="Fiber" />
                        </div>
                        <p className={styles["macro-qty"]}>
                          {calcMacroQty(
                            activeAddEditData?.macro?.fiber,
                            mealQty,
                            activeAddEditData?.macro?.qty
                          )}{" "}
                          g
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className={`${styles["btn"]} ${styles["add-edit-btn"]}`}
                  disabled={mealQty === 0 || data?.qty === mealQty}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AddEditModal;
