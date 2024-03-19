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
import { macroCalcKcal, mealCalcKcal } from "../../../utils/macrosUtils";

function AddEditModal({
  openModal,
  setOpenModal,
  title,
  isEditModal = false,
  data,
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
                <p className={styles["qty"]}>{`Quantity: ${mealQty || 0} g - ${
                  isEditModal
                    ? mealCalcKcal(activeAddEditData, mealQty)
                    : macroCalcKcal(activeAddEditData, mealQty)
                } kcal`}</p>
              </div>
              <div className={styles["container"]}>
                <div className={styles["macro-input"]}>
                  <button
                    className={`${styles.btn} ${styles["qty-update-button"]}`}
                    onClick={handleMealQtyDecrement}
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
                  >
                    +
                  </button>
                </div>
                <p className={styles["unit"]}>Grams</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AddEditModal;
