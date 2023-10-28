import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./macros.module.scss";
import fetchApi from "../../../utils/fetch-utils";
import Cookies from "js-cookie";
import Loader from "../../Loader/Loader";
import TableGrid from "../../TableGrid/TableGrid";

function Macros() {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnDefs = [
    { field: "name", headerName: "Name" },
    { field: "qty", headerName: "Quantity" },
    { field: "protein", headerName: "Protein" },
    { field: "carbohydrates", headerName: "carbs" },
    { field: "fat", headerName: "fat" },
    { field: "fiber", headerName: "fiber" },
    { field: "calories", headerName: "Calories" },
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
      return kcal;
    },
    [macrosCalories]
  );

  const processData = useCallback(
    (dataArr) => {
      const processedDataArr = dataArr.map((ele) => {
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
  }, [initData]);
  return (
    <section className={styles.section}>
      <p className={styles["title"]}>Macros</p>
      <TableGrid rowData={rowData} columnDefs={columnDefs} />
      {loading && <Loader />}
    </section>
  );
}

export default Macros;
