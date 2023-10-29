import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./addmacro.module.scss";
import Modal from "../../Modal/Modal";
import InputComponent from "../../FormComponents/InputComponent/InputComponent";

function AddMacro({ openModal, setOpenModal, setMacroUpdate }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
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
