import React, { useState } from "react";
import { selectLoading } from "../../../reducers/userReducer";
import { useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import Edit from "./Edit/Edit";
import Display from "./Display/Display";

function ProfileComponent() {
  const [edit, setEdit] = useState(false);
  const isLoading = useSelector(selectLoading);

  return (
    <>
      {!edit && <Display setEdit={setEdit} />}
      {edit && <Edit setEdit={setEdit} />}
      {isLoading && <Loader />}
    </>
  );
}

export default ProfileComponent;
