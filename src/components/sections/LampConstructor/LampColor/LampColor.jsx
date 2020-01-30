import React, { useState } from "react";
import styles from "./LampColor.module.scss";

const LampColor = props => {
  const [activeColor, setActiveColor] = useState(1);

  return (
    <div className={styles.lamp_color}>
      <div className={styles.lamp_color__info}>
        выберите <span className="purpure_text">цвет</span> корпуса светильника:
      </div>
      <div className={styles.color_switch}>
        <div
          className={`${styles.color_switch__variant} ${
            activeColor === 1 ? styles.color_switch__active_variant : ""
          }`}
          onClick={() => setActiveColor(1)}
        >
          <div className={styles.variant__label}>
            <div className={styles.label__radio}></div>Серый
          </div>
          <div className={styles.variant__image}>
            <img src={"/static/images/lamp-gray.png"} alt="lamp-gray" />
          </div>
        </div>
        <div
          className={`${styles.color_switch__variant} ${
            activeColor === 2 ? styles.color_switch__active_variant : ""
          }`}
          onClick={() => setActiveColor(2)}
        >
          <div className={styles.variant__label}>
            <div className={styles.label__radio}></div>Черный
          </div>
          <div className={styles.variant__image}>
            <img src={"/static/images/lamp-black.png"} alt="lamp-black" />
          </div>
        </div>
        <div
          className={`${styles.color_switch__variant} ${
            activeColor === 3 ? styles.color_switch__active_variant : ""
          }`}
          onClick={() => setActiveColor(3)}
        >
          <div className={styles.variant__label}>
            <div className={styles.label__radio}></div>Белый
          </div>
          <div className={styles.variant__image}>
            <img src={"/static/images/lamp-white.png"} alt="lamp-white" />
          </div>
        </div>
        <div
          className={`${styles.color_switch__variant} ${
            activeColor === 4 ? styles.color_switch__active_variant : ""
          }`}
          onClick={() => setActiveColor(4)}
        >
          <div className={styles.variant__label}>
            <div className={styles.label__radio}></div>Золотой
          </div>
          <div className={styles.variant__image}>
            <img src={"/static/images/lamp-gold.png"} alt="lamp-gold" />
          </div>
        </div>
        <div
          className={`${styles.color_switch__variant} ${
            activeColor === 5 ? styles.color_switch__active_variant : ""
          }`}
          onClick={() => setActiveColor(5)}
        >
          <div className={styles.variant__label}>
            <div className={styles.label__radio}></div>
            <div className={styles.expert_advice}>
              <div>Нужен совет специалиста</div>
              <div>?</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LampColor;
