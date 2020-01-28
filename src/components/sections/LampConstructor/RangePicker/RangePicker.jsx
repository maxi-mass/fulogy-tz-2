import React, { useState } from "react";
import styles from "./RangePicker.module.scss";

const RangePicker = props => {
  const width = 367;
  const range = 6.5;
  const [left, setLeft] = useState(((3.4 - 0.5) * 95.5) / range);
  const [value, setValue] = useState(3.4);
  return (
    <div className={styles.range_picker}>
      <div className={styles.range_picker__info}>
        чтобы узнать приблизительную стоимость
        <br /> вашего светильника,
        <span className="purpure_text"> выберите его длину:</span>
      </div>
      <div className={styles.range_picker__range_input}>
        <div className={styles.range_input__slider}>
          <span className={styles.slider_inner__num}>0.5 м</span>
          <div style={{ width: width + "px" }} className={styles.slider_inner}>
            <output
              style={{ left: left - 2 + "%" }}
              className={styles.range_input__output}
              htmlFor="fader"
            >
              {`${value} м`}
            </output>
            <input
              type={"range"}
              id={"fader"}
              className={styles.range_input__fader}
              min={"0.5"}
              max={"7.0"}
              value={value}
              step={"0.1"}
              onInput={e => {
                const currentValue = e.target.value;
                const offsetPercent = ((currentValue - 0.5) * 95.5) / range;
                setLeft(offsetPercent.toFixed(1));
                setValue(e.target.value);
              }}
            />
          </div>
          <span className={styles.slider_inner__num}>7.0 м</span>
        </div>
      </div>
    </div>
  );
};

export default RangePicker;
