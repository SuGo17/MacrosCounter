import React, { useEffect, useMemo, useState } from "react";
import { IconContext } from "react-icons";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import Modal from "../../Modal/Modal";
import InputComponent from "../../FormComponents/InputComponent/InputComponent";
import styles from "./editmodal.module.scss";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectToken, selectUserDetails } from "../../../reducers/userReducer";
import fetchApi from "../../../utils/fetch-utils";
import Loader from "../../Loader/Loader";
import CheckboxComponent from "../../FormComponents/CheckboxComponent/CheckboxComponent";

function EditModal({ data, params }) {
  const { setUserUpdate } = params;
  const { email } = useSelector(selectUserDetails);
  const [value, setValue] = useState({
    "userEdit-name1": data.name,
    "userEdit-email1": data.email,
    "userEdit-role1": data.role,
  });
  // const [role, setRole] = useState(data.role);
  const [err, setErr] = useState({
    "userEdit-name1": false,
    "userEdit-email1": false,
  });
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupMsg] = useState(
    email === data.email
      ? "You cannot edit your own access!."
      : "You are able to edit only User Role."
  );
  const token = useSelector(selectToken);
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

  const handleRoleToggle = (e) => {
    e.target.checked
      ? setValue((prev) => {
          return { ...prev, "userEdit-role1": "ADMIN" };
        })
      : setValue((prev) => {
          return { ...prev, "userEdit-role1": "USER" };
        });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      usersArr: [{ id: data._id, admin: value["userEdit-role1"] === "ADMIN" }],
    };
    try {
      const res = await fetchApi({
        urlExt: "admin/change-role",
        method: "POST",
        formData,
        token,
      });
      if (!res.ok) toast.error(res.error, toastOptions);
      setLoading(false);
      toast.success("User access updated successfully", toastOptions);
      setOpenModal(false);
      setUserUpdate((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    openModal && toast.info(popupMsg, toastOptions);
    return () => {
      setValue((prev) => {
        return { ...prev, "userEdit-role1": data.role };
      });
    };
  }, [data, openModal, toastOptions, popupMsg]);

  useEffect(() => {
    if (openModal && err && err["userEdit-name1"] && err["userEdit-email1"]) {
      toast.error("Something went wrong", toastOptions);
      setErr(null);
    }
  }, [err, toastOptions, openModal]);

  return (
    <div className={styles.container}>
      {/* prettier-ignore */}
      <IconContext.Provider value={{style: {height: "1.8rem", width: "1.8rem", cursor: "pointer"}}}>
        <IoEllipsisVerticalSharp onClick={()=>setOpenModal(true)} />
      </IconContext.Provider>
      {/* prettier-ignore */}
      <Modal title="Edit Access" openModal={openModal} setOpenModal={setOpenModal}>
        <form onSubmit={handleSubmit}>
        <InputComponent data={{ id: "userEdit-name1", type: "text", label: "NAME",disabled:true }}
            value={value}
            setValue={setValue}
            setJoinErr={setErr}/>
        <InputComponent data={{ id: "userEdit-email1", type: "text", label: "EMAIL",disabled:true }}
            value={value}
            setValue={setValue}
            setJoinErr={setErr}/>
        <CheckboxComponent data={{id:"userEdit-role1",label:"ADMIN",disabled:data.email === email}} value={value} handleChange={handleRoleToggle} />
        <button className={styles.btn} disabled={data.email === email || data.role === value["userEdit-role1"]}>SAVE</button>
        </form>
      </Modal>
      {loading && <Loader />}
    </div>
  );
}

export default EditModal;
