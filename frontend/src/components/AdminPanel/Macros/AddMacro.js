import React, { useState } from "react";
import styles from "./addmacro.module.scss";
import Modal from "../../Modal/Modal";
import InputComponent from "../../FormComponents/InputComponent/InputComponent";

function AddMacro({ openModal, setOpenModal }) {
  const formComponents = [
    { id: "addMacro-name1", type: "text", label: "NAME" },
    { id: "addMacro-qty1", type: "text", label: "QUANTITY" },
    { id: "addMacro-protein1", type: "text", label: "PROTEIN" },
    { id: "addMacro-carbs1", type: "text", label: "CARBS" },
    { id: "addMacro-fat1", type: "text", label: "FAT" },
    { id: "addMacro-fiber1", type: "text", label: "FIBER" },
  ];
  let initValue = {};
  formComponents.forEach((ele) => (initValue[ele.id] = ""));
  const [value, setValue] = useState(initValue);
  const [err, setErr] = useState(initValue);
  return (
    <>
      {openModal && (
        <Modal
          title="Edit Access"
          openModal={openModal}
          setOpenModal={setOpenModal}
          classes={styles["overflow-scroll"]}
        >
          <form>
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
            <button className={styles.btn}>SAVE</button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default AddMacro;
