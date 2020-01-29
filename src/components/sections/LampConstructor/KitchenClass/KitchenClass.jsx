import React, { useState } from "react";
import styles from "./KitchenClass.module.scss";

const KitchenClass = props => {
  const [kitchenClass, setKitchenClass] = useState(1);
  return (
    <div className={styles.kitchen_class}>
      <div className={styles.kitchen_class__info}>
        выберите <span className="purpure_text">класс</span> светильника:
      </div>
      <div className={styles.switch_class}>
        <div>
          <div
            className={styles.switch_class__label}
            onClick={() => setKitchenClass(1)}
          >
            <div className={styles.label__radio}></div>PRO
          </div>
          <div className={styles.switch_class__content}>
            <p>- Полностью готовый к установке светильник</p>
            <p>- Профиль FULOGY</p>
            <p>- Лента PRO 140LED/m, 18 W/m, CRI>90, яркость 2000Lm/m.</p>
            <p>- Наличие техподдержки </p>
            <p>- Возможен монтаж «под ключ» </p>
            <p>- Гарантия 3 года</p>
          </div>
        </div>
        <div>
          <div
            className={styles.switch_class__label}
            onClick={() => setKitchenClass(2)}
          >
            <div className={styles.label__radio}></div>PRO+
          </div>
          <div className={styles.switch_class__content}>
            <p>- Полностью готовый к установке светильник</p>
            <p>
              - Профиль FULOGY
              <br />
              <span className={"purpure_text"}>
                серый, черный, белый, золотой
              </span>
            </p>
            <p>- Лента LUX 168LED/m, 24 W/m, CRI>95, яркость 2000Lm/m</p>
            <p>- Наличие техподдержки</p>
            <p>- Возможен монтаж «под ключ»</p>
            <p>- Гарантия 5 года</p>
          </div>
        </div>
        <div>
          <div
            className={styles.switch_class__label}
            onClick={() => setKitchenClass(3)}
          >
            <div className={styles.label__radio}></div>
          </div>
          <div className={styles.switch_class__content}>
            <div>
              <div>Нужен совет специалиста</div>
              <div>?</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenClass;
