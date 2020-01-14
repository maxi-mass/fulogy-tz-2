import React, { useState } from "react";
import styles from "./LampSlider.module.css";

const LampSlider = props => {
  const [lampColor, setLampColor] = useState("gold");
  return (
    <div className={styles.content_right}>
      <div className={styles.content_right__switch}>
        <div className={styles.switch_group}>
          <div
            onClick={() => setLampColor("gold")}
            className={styles.switch_gold}
          ></div>
          <div
            onClick={() => setLampColor("white")}
            className={styles.switch_white}
          ></div>
          <div
            onClick={() => setLampColor("black")}
            className={styles.switch_black}
          ></div>
          <div
            onClick={() => setLampColor("gray")}
            className={styles.switch_gray}
          ></div>
        </div>
      </div>
      <img src="/static/images/man.png" alt="man" />
      <div className={styles.content_right__lamp_variant}>
        <img src={`/static/images/lamp-${lampColor}.png`} alt="lamp" />
      </div>
    </div>
  );
};

export default LampSlider;
