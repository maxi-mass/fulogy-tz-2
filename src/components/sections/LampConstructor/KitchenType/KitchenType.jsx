import React, { useState } from "react";
import styles from "./KitchenType.module.scss";

const KitchenType = props => {
  const [type, setType] = useState(2);

  const activeType1 = type === 1 ? styles.variant_label_active : "";
  const activeType2 = type === 2 ? styles.variant_label_active : "";
  const activeType3 = type === 3 ? styles.variant_label_active : "";
  const activeType4 = type === 4 ? styles.variant_label_active : "";

  return (
    <div className={styles.kitchen_type}>
      <div className={styles.kitchen_type__info}>
        выберите <span className="purpure_text">тип планировки</span> кухни:
      </div>
      <div className={styles.kitchen_type__switch}>
        <div className={styles.switch__type}>
          <div className={styles.type__variant}>
            <div
              className={`${styles.variant_label} ${activeType1}`}
              onClick={() => setType(1)}
            >
              <div></div>
              Прямая
            </div>
            <div className={styles.variant_image}>
              <img src={"/static/images/kitchen-type-1.png"} alt="type-1" />
            </div>
          </div>
          <div className={styles.type__variant}>
            <div
              className={`${styles.variant_label} ${activeType2}`}
              onClick={() => setType(2)}
            >
              <div></div>
              Г-образная
            </div>
            <div className={styles.variant_image}>
              <img src={"/static/images/kitchen-type-2.png"} alt="type-2" />
            </div>
          </div>
          <div className={styles.type__variant}>
            <div
              className={`${styles.variant_label} ${activeType3}`}
              onClick={() => setType(3)}
            >
              <div></div>
              П-образная
            </div>
            <div className={styles.variant_image}>
              <img src={"/static/images/kitchen-type-3.png"} alt="type-3" />
            </div>
          </div>
          <div className={`${styles.type__variant}`}>
            <div
              className={`${styles.variant_label} ${activeType4}`}
              onClick={() => setType(4)}
            >
              <div></div>
            </div>
            <div className={`${styles.expert_advice} ${activeType4}`}>
              <div>Нужен совет специалиста</div>
              <div>?</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenType;
