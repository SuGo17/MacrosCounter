import React, { useCallback, useEffect, useState } from "react";
import styles from "./users.module.scss";
import TableGrid from "../../TableGrid/TableGrid";
import fetchApi from "../../../utils/fetch-utils";
import Cookies from "js-cookie";
import Loader from "../../Loader/Loader";
import EditModal from "./EditModal";

function Users() {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userUpdate, setUserUpdate] = useState(false);
  const columnDefs = [
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "role", headerName: "Role" },
    {
      field: "",
      headerName: "",
      cellRenderer: EditModal,
      cellRendererParams: { setUserUpdate: setUserUpdate },
    },
  ];
  const cleanData = (data) => {
    let allUsers = [...data.admins, ...data.users];
    allUsers = allUsers.map((ele) => {
      delete ele._id;
      delete ele.__v;
      return { role: ele.role, ...ele.user_id };
    });
    return allUsers.sort((a, b) => a.name.localeCompare(b.name));
  };

  const initData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchApi({
        urlExt: "admin/get-all-users",
        method: "GET",
        token: Cookies.get("userToken"),
      });
      if (!data.ok) throw new Error(data.error);
      const processedData = cleanData(data);
      setRowData(processedData);
    } catch (err) {
      console.error(err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    initData();
  }, [initData, userUpdate]);
  return (
    <section className={styles.section}>
      <p className={styles["title"]}>Users</p>
      <TableGrid rowData={rowData} columnDefs={columnDefs} />
      {loading && <Loader />}
    </section>
  );
}

export default Users;
