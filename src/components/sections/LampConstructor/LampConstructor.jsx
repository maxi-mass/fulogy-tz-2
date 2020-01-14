import React from "react";
import styles from "./LampConstructor.module.css";
import RangePicker from "./RangePicker/RangePicker";

const LampConstructor = props => {
  return (
    <div className={styles.lamp_constructor}>
      <div className={styles.lamp_constructor_inner}>
        <RangePicker />
      </div>
    </div>
  );
};

export default LampConstructor;
