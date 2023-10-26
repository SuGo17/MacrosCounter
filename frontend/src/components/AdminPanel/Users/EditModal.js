import React, { useState } from "react";
import { IconContext } from "react-icons";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import Modal from "../../Modal/Modal";

function EditModal({ data }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      {/* prettier-ignore */}
      <IconContext.Provider value={{style: {height: "1.8rem", width: "1.8rem", cursor: "pointer"}}}>
        <IoEllipsisVerticalSharp onClick={()=>setOpenModal(true)} />
      </IconContext.Provider>
      {/* prettier-ignore */}
      <Modal title="Edit Access" openModal={openModal} setOpenModal={setOpenModal}>
        <>Modal Content</>
      </Modal>
    </div>
  );
}

export default EditModal;
