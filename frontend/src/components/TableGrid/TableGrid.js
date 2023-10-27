import React from "react";
import styles from "./tablegrid.module.scss";

function TableGrid({ rowData, columnDefs }) {
  return (
    <div className={styles["container"]}>
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
                    : data[column.field]}
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
