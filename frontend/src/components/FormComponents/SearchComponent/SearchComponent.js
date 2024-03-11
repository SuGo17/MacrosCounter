import React, { useEffect, useState } from "react";
import styles from "./searchComponent.module.scss";

function SearchComponent({ data, value, setValue }) {
  const { classes, id, placeholder } = data;
  const [inpValue, setInpValue] = useState(value[id]);
  const handleInputChange = (e) => {
    setInpValue(e.target.value);
  };

  useEffect(() => {
    setValue((prev) => {
      let a = { ...prev };
      a[`${id}`] = inpValue;
      return a;
    });
  }, [inpValue, id, setValue]);

  return (
    <div className={styles["input-container"]}>
      <input
        type="text"
        value={inpValue}
        placeholder={placeholder}
        className={`search-input-box1 ${classes ? classes : ""}`}
        id={id}
        onChange={handleInputChange}
      />
      {/* {err && <p className={styles["error"]}>* {`${err}`}</p>} */}
    </div>
  );
}

export default SearchComponent;
