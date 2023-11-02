import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IconContext } from "react-icons";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import styles from "./editmacro.module.scss";
import "react-tooltip/dist/react-tooltip.css";
import InputComponent from "../../FormComponents/InputComponent/InputComponent";
import Modal from "../../Modal/Modal";
import fetchApi from "../../../utils/fetch-utils";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectToken } from "../../../reducers/userReducer";
function EditMacro({ data, params }) {
  const { setMacroUpdate, setLoading, macroUpdate } = params;
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
      { id: "addMacro-name1", type: "text", label: "NAME",value:data?.name},
      { id: "addMacro-qty1", type: "text", label: "QUANTITY",valueType:"number",value:data?.qty },
      { id: "addMacro-protein1", type: "text", label: "PROTEIN",valueType:"number",value:data?.protein },
      { id: "addMacro-carbs1", type: "text", label: "CARBS",valueType:"number",value:data?.carbohydrates },
      { id: "addMacro-fat1", type: "text", label: "FAT",valueType:"number",value:data?.fat },
      { id: "addMacro-fiber1", type: "text", label: "FIBER",valueType:"number",value:data?.fiber },
    ],
    [data]
  );
  const initValue = useMemo(() => {
    return {};
  }, []);
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [value, setValue] = useState(initValue);
  const [err, setErr] = useState(initValue);
  const token = useSelector(selectToken);

  const disabledBtn = useCallback(() => {
    const emptyVal = Object.keys(value).reduce((a, b) => {
      return a || value[b] === "";
    }, false);

    let oldValue = formComponents.reduce((op, ele) => {
      return op && ele.value === value[ele.id];
    }, true);

    return (
      emptyVal ||
      oldValue ||
      Object.keys(err).reduce((a, b) => {
        return a || err[b];
      }, false)
    );
  }, [err, value, formComponents]);

  const handleSubmit = async (e, method) => {
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
    const options = {
      urlExt: "macros/" + data._id,
      method,
      token,
    };
    method === "PATCH" && (options.formData = formData);
    try {
      const res = await fetchApi(options);
      if (!res.ok) toast.error(res.error, toastOptions);
      setOpenModal(false);
      setMacroUpdate((prev) => !prev);
    } catch (error) {
      toast.error("Something went wrong!.", toastOptions);
      console.log(error.message);
    }
    setLoading(false);
  };

  const handleSubmitEdit = (e) => {
    handleSubmit(e, "PATCH");
  };
  const handleSubmitDelete = (e) => {
    handleSubmit(e, "DELETE");
  };

  const handleDeleteClick = () => {
    setOpenModal(true);
    setIsEdit(false);
  };
  const handleEditClick = () => {
    setOpenModal(true);
    setIsEdit(true);
  };

  useEffect(() => {
    formComponents.forEach((ele) => (initValue[ele.id] = ele.value));
    !openModal && setValue(initValue);
  }, [openModal, formComponents, initValue, macroUpdate]);

  return (
    <>
      {/* prettier-ignore */}
      <div>
        <IconContext.Provider value={{style: {height: "2.4rem", width: "2.4rem", cursor: "pointer",marginRight:"0.5rem"}}}>
          <BiSolidEdit onClick={handleEditClick}/>
          <MdDelete onClick={handleDeleteClick}/>
        </IconContext.Provider>
      </div>
      {openModal && (
        <Modal
          title="Add New Macro"
          openModal={openModal}
          setOpenModal={setOpenModal}
          classes={styles["overflow-scroll"]}
        >
          {isEdit && (
            <form onSubmit={handleSubmitEdit}>
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
          )}
          {!isEdit && (
            <form onSubmit={handleSubmitDelete} className={styles.deleteForm}>
              <label>
                {" "}
                Are you sure you want to delete <strong>
                  "{data.name}"
                </strong>{" "}
                entry.
              </label>
              <button className={styles.btn}>Confirm</button>
            </form>
          )}
        </Modal>
      )}
    </>
  );
}

export default EditMacro;
