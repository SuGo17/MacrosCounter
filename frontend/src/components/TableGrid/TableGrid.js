import React from "react";
import styles from "./tablegrid.module.scss";

function TableGrid({ rowData, columnDefs, classes }) {
  return (
    <div className={`${styles["container"]} ${classes}`}>
      <table>
        <thead>
          <tr>
            {columnDefs.map((ele, ind) => (
              <th key={ind}>{ele.headerName || ele.field || ""}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowData.map((data, ind) => (
            <tr key={`row-${ind}`} data-id={data._id}>
              {columnDefs.map((column, index) => (
                <td key={`cell-${index}`}>
                  {column.cellRenderer
                    ? column.cellRenderer({
                        data,
                        ...column.cellRendererParams,
                      })
                    : data[column.field] +
                      " " +
                      (column.unit ? column.unit : "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableGrid;
