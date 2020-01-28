import React from "react";
import styles from "./LampConstructor.module.scss";
import RangePicker from "./RangePicker/RangePicker";
import KitchenType from "./KitchenType/KitchenType";

const LampConstructor = props => {
  return (
    <div className={styles.lamp_constructor}>
      <div className={styles.lamp_constructor_inner}>
        <RangePicker />
        <KitchenType />
      </div>
    </div>
  );
};

export default LampConstructor;
