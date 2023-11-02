import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./macros.module.scss";
import fetchApi from "../../../utils/fetch-utils";
import Cookies from "js-cookie";
import Loader from "../../Loader/Loader";
import TableGrid from "../../TableGrid/TableGrid";
import { MdAddBox } from "react-icons/md";
import { IconContext } from "react-icons";
import EditMacro from "./EditMacro";
import AddMacro from "./AddMacro";

function Macros() {
  const [rowData, setRowData] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [macroUpdate, setMacroUpdate] = useState(false);
  const columnDefs = [
    { field: "name", headerName: "Name" },
    { field: "qty", headerName: "Quantity", unit: "g" },
    { field: "protein", headerName: "Protein", unit: "g" },
    { field: "carbohydrates", headerName: "carbs", unit: "g" },
    { field: "fat", headerName: "fat", unit: "g" },
    { field: "fiber", headerName: "fiber", unit: "g" },
    { field: "calories", headerName: "Calories", unit: "kcal" },
    {
      field: "",
      headerName: "",
      cellRenderer: EditMacro,
      cellRendererParams: {
        setLoading: setLoading,
        setMacroUpdate: setMacroUpdate,
        macroUpdate: macroUpdate,
      },
    },
  ];

  const macrosCalories = useMemo(() => {
    return { protein: 4, carbohydrates: 4, fat: 9, fiber: 2 };
  }, []);

  const calcKcal = useCallback(
    (macro) => {
      let kcal = 0;
      Object.keys(macrosCalories).forEach((ele) => {
        kcal += macrosCalories[ele] * macro[ele];
      });
      return Math.round(kcal);
    },
    [macrosCalories]
  );

  const processData = useCallback(
    (dataArr) => {
      const processedDataArr = dataArr.map((ele) => {
        ele.name = ele.name
          .split(" ")
          .map((word) => {
            return word[0].toUpperCase() + word.slice(1).toLowerCase();
          })
          .join(" ");
        ele.calories = calcKcal(ele);
        return ele;
      });
      return processedDataArr;
    },
    [calcKcal]
  );

  const initData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchApi({
        urlExt: "macros/all",
        method: "GET",
        token: Cookies.get("userToken"),
      });
      if (!data.ok) throw new Error(data.error);
      setRowData(processData(data.all_ingredients));
    } catch (err) {
      console.error(err.message);
    }
    setLoading(false);
  }, [processData]);

  useEffect(() => {
    initData();
  }, [initData, macroUpdate]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles["title"]}>Macros</p>
        <button className={styles.btn} onClick={() => setOpenAddModal(true)}>
          <IconContext.Provider
            value={{
              style: { height: "2rem", width: "2rem", color: "#fff" },
            }}
          >
            <MdAddBox />
          </IconContext.Provider>
          <p>
            Add <span>Macro</span>
          </p>
        </button>
      </div>
      <div className={styles.header}></div>
      <TableGrid
        rowData={rowData}
        columnDefs={columnDefs}
        classes={styles["container-overflow"]}
      />
      {loading && <Loader />}
      <AddMacro
        openModal={openAddModal}
        setOpenModal={setOpenAddModal}
        setMacroUpdate={setMacroUpdate}
        setLoading={setLoading}
      />
    </section>
  );
}

export default Macros;
