import React from "react";
import styles from "./AboutPrice.module.css";

const AboutPrice = props => {
  return (
    <div className={styles.about_price}>
      <div className={styles.about_price__inner}>
        <div>чтобы узнать стоимость светильника,</div>
        <div>
          подходящего к Вашему дизайну,
          <br /> воспользуйтесь конструктором расчета стоимости:
        </div>
      </div>
      <div className={styles.about_price__arrow_down}></div>
      <div className={styles.about_price__lamp_bg}>
        <img src="/static/images/lamp-bg.png" />
      </div>
    </div>
  );
};

export default AboutPrice;
