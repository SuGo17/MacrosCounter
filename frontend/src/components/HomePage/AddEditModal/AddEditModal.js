import React, { useEffect, useState } from "react";
import styles from "./addEditModal.module.scss";
import Modal from "../../Modal/Modal";
import SearchComponent from "../../FormComponents/SearchComponent/SearchComponent";
import useGetMacros from "../../../hooks/useGetMacros";
import MacrosCard from "../MacrosCard/MacrosCard";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { toastOptions } from "../../../reducers/userReducer";

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
  const [showHeader, setShowHeader] = useState(
    !isEditModal || !showDetailsModal
  );

  const getMacrosSearch = useGetMacros();

  useEffect(() => {
    console.log(data);
    isEditModal && openModal && data && setActiveAddEditData(data);
    return () => {
      !openModal && setValue({ "addModal-search1": "" });
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

  return (
    <div className={styles.container}>
      <Modal
        title={`${isEditModal ? "Edit" : "Add"} ${title} Meal`}
        showHeader={showHeader}
        openModal={openModal}
        setOpenModal={setOpenModal}
        classes={`${styles["min-height-50"]}`}
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
          <div
            className="edit-modal"
            onClick={() => setShowDetailsModal(false)}
          >
            <p>Name: {activeAddEditData?.name}</p>
            <p>Quantity: {activeAddEditData?.qty} g</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AddEditModal;
