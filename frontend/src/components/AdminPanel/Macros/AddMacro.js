import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./addmacro.module.scss";
import Modal from "../../Modal/Modal";
import InputComponent from "../../FormComponents/InputComponent/InputComponent";
import fetchApi from "../../../utils/fetch-utils";
import { useSelector } from "react-redux";
import { selectToken } from "../../../reducers/userReducer";
import { toast } from "react-toastify";

function AddMacro({ openModal, setOpenModal, setMacroUpdate, setLoading }) {
  const toastOptions = useMemo(() => {
    return {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };
  }, []);
  const formComponents = useMemo(
    // prettier-ignore
    () => [
      { id: "addMacro-name1", type: "text", label: "NAME" },
      { id: "addMacro-qty1", type: "text", label: "QUANTITY",valueType:"number" },
      { id: "addMacro-protein1", type: "text", label: "PROTEIN",valueType:"number" },
      { id: "addMacro-carbs1", type: "text", label: "CARBS",valueType:"number" },
      { id: "addMacro-fat1", type: "text", label: "FAT",valueType:"number" },
      { id: "addMacro-fiber1", type: "text", label: "FIBER",valueType:"number" },
    ],
    []
  );
  let initValue = useMemo(() => {
    return {};
  }, []);
  formComponents.forEach((ele) => (initValue[ele.id] = ""));
  const [value, setValue] = useState(initValue);
  const [err, setErr] = useState(initValue);
  const token = useSelector(selectToken);
  const disabledBtn = useCallback(() => {
    const emptyVal = Object.keys(value).reduce((a, b) => {
      return a || value[b] === "";
    }, false);

    return (
      emptyVal ||
      Object.keys(err).reduce((a, b) => {
        return a || err[b];
      }, false)
    );
  }, [err, value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      name: value["addMacro-name1"],
      protein: value["addMacro-protein1"],
      carbohydrates: value["addMacro-carbs1"],
      fat: value["addMacro-fat1"],
      fiber: value["addMacro-fiber1"],
      qty: value["addMacro-qty1"],
    };
    try {
      const res = await fetchApi({
        urlExt: "macros",
        method: "POST",
        formData,
        token,
      });
      if (!res.ok) toast.error(res.error, toastOptions);
      setOpenModal(false);
      setMacroUpdate((prev) => !prev);
    } catch (error) {
      toast.error("Something went wrong!.", toastOptions);
      console.log(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    formComponents.forEach((ele) => (initValue[ele.id] = ""));
    openModal === false && setValue(initValue);
  }, [openModal, formComponents, initValue]);
  return (
    <>
      {openModal && (
        <Modal
          title="Add New Macro"
          openModal={openModal}
          setOpenModal={setOpenModal}
          classes={styles["overflow-scroll"]}
        >
          <form onSubmit={handleSubmit}>
            {formComponents.map((ele, ind) => {
              return (
                <InputComponent
                  key={ind}
                  data={ele}
                  value={value}
                  setValue={setValue}
                  setJoinErr={setErr}
                />
              );
            })}
            <button className={styles.btn} disabled={disabledBtn()}>
              SAVE
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default AddMacro;
