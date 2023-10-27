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

function EditModal({ data, setUserUpdate }) {
  const { email } = useSelector(selectUserDetails);
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
  const [value, setValue] = useState({
    "userEdit-name1": data.name,
    "userEdit-email1": data.email,
  });
  const [role, setRole] = useState(data.role);
  const [err, setErr] = useState({
    "userEdit-name1": false,
    "userEdit-email1": false,
  });
  const [openModal, setOpenModal] = useState(false);
  const [popupMsg] = useState(
    email === data.email
      ? "You cannot edit your own access!."
      : "You are able to edit only User Role."
  );
  const handleRoleToggle = (e) => {
    e.target.checked ? setRole("ADMIN") : setRole("USER");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { usersArr: [{ id: data._id, admin: role === "ADMIN" }] };
    try {
      const res = await fetchApi({
        urlExt: "admin/change-role",
        method: "POST",
        formData,
        token,
      });
      if (!res.ok) toast.error(res.error, toastOptions);
      toast.success("User access updated successfully", toastOptions);
      setOpenModal(false);
      setUserUpdate((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    openModal && toast.info(popupMsg, toastOptions);
    return () => {
      setRole(data.role);
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
        <div className={styles['checkbox-container']}>
          <label htmlFor="userEdit-admin1">ADMIN</label>
          <input type="checkbox" name="admin" id="userEdit-admin1" checked = {role==='ADMIN'} disabled={data.email === email} onChange={ handleRoleToggle}/>
        </div>
        <button className={styles.btn} disabled={data.email === email || data.role === role}>SAVE</button>
        </form>
      </Modal>
    </div>
  );
}

export default EditModal;
