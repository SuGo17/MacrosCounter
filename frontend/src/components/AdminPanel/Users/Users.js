import React, { useCallback, useEffect, useState } from "react";
import styles from "./users.module.scss";
import TableGrid from "../../TableGrid/TableGrid";
import fetchApi from "../../../utils/fetch-utils";
import Cookies from "js-cookie";

function Users() {
  const [rowData, setRowData] = useState([]);
  const columnDefs = [
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "role", headerName: "Role" },
  ];
  const cleanData = (data) => {
    const allUsers = [...data.admins, ...data.users];
    return allUsers.map((ele) => {
      delete ele._id;
      delete ele.__v;
      return { role: ele.role, ...ele.user_id };
    });
  };

  const initData = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    initData();
  }, [initData]);
  return (
    <section className={styles.section}>
      <p className={styles["title"]}>Users</p>
      <TableGrid rowData={rowData} columnDefs={columnDefs} />
    </section>
  );
}

export default Users;
