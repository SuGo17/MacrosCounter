import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IconContext } from "react-icons";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import styles from "./editmacro.module.scss";
import "react-tooltip/dist/react-tooltip.css";
import InputComponent from "../../FormComponents/InputComponent/InputComponent";
import Modal from "../../Modal/Modal";
import fetchApi from "../../../utils/fetch-utils";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectToken } from "../../../reducers/userReducer";
function EditMacro({ data, setMacroUpdate, setLoading }) {
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(initValue);
  const [err, setErr] = useState(initValue);
  const tooltipRef = useRef(null);
  const token = useSelector(selectToken);

  const handleClickOutside = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target))
      setMenuOpen(false);
  };

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
        urlExt: "macros/" + data._id,
        method: "PATCH",
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
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [formComponents, initValue]);

  useEffect(() => {
    formComponents.forEach((ele) => (initValue[ele.id] = ele.value));
    !openModal && setValue(initValue);
  }, [openModal, formComponents, initValue]);

  return (
    <>
      {/* prettier-ignore */}
      <div ref={tooltipRef}>
        <IconContext.Provider value={{style: {height: "1.8rem", width: "1.8rem", cursor: "pointer"}}}>
          <IoEllipsisVerticalSharp data-tooltip-place='bottom' id={`clickable-${data.id}`} onClick={()=>setMenuOpen(true)} />
        </IconContext.Provider>
      {/* prettier-ignore */}
      <Tooltip clickable offset='10' anchorSelect={`#clickable-${data.id}`} noArrow openOnClick={true} isOpen={menuOpen} className={styles["tooltip-options"]}>
        <p onClick={()=>setOpenModal(true)}>Edit</p>
        <p>Delete</p>
      </Tooltip>
      </div>
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

export default EditMacro;
