import React from "react";
import styles from "./RangePicker.module.scss";

const RangePicker = props => {
  return (
    <div className={styles.range_picker}>
      <div className={styles.range_picker__info}>
        чтобы узнать приблизительную стоимость
        <br /> вашего светильника,
        <span className="purpure_text"> выберите его длину:</span>
      </div>
      <div className={styles.range_picker__range_input}>
        <input type="range" />
      </div>
    </div>
  );
};

export default RangePicker;
