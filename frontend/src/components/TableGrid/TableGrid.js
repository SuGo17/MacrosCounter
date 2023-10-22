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
          {rowData.map((ele, ind) => (
            <tr key={`row-${ind}`} data-id={ele._id}>
              {columnDefs.map((column, index) => (
                <td key={`cell-${index}`}>
                  {column.cellrenderer
                    ? column.cellrenderer(ele, ...column.cellrendererParams)
                    : ele[column.field]}
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
