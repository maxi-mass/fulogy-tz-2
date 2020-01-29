import React from "react";
import styles from "./KitchenType.module.scss";

const KitchenType = props => {
  return (
    <div className={styles.kitchen_type}>
      <div className={styles.kitchen_type__info}>
        выберите <span className="purpure_text">тип планировки</span> кухни:
      </div>
      <div className={styles.kitchen_type__switch}>
        <div className={styles.switch__type}>
          <div className={styles.type__variant}>
            <div className={styles.variant_label}>
              <div></div>Прямая
            </div>
            <div className={styles.variant_image}>
              <img src={"/static/images/kitchen-type-1.png"} alt="type-1" />
            </div>
          </div>
          <div className={styles.type__variant}>
            <div className={styles.variant_label}>
              <div></div>Г-образная
            </div>
            <div className={styles.variant_image}>
              <img src={"/static/images/kitchen-type-2.png"} alt="type-2" />
            </div>
          </div>
          <div className={styles.type__variant}>
            <div className={styles.variant_label}>
              <div></div>П-образная
            </div>
            <div className={styles.variant_image}>
              <img src={"/static/images/kitchen-type-3.png"} alt="type-3" />
            </div>
          </div>
          <div className={styles.type__variant}>
            <div className={styles.variant_label}>
              <div></div>
            </div>
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

export default KitchenType;
