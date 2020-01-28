import React from "react";
import styles from "./Portfolio.module.scss";

const Portfolio = props => {
  return (
    <div className={styles.portfolio}>
      <div className={styles.portfolio__inner_wrapper}>
        <p className={styles.inner_wrapper__label}>
          Установленные светильники:
        </p>
        <div className={styles.inner_wrapper__works}>
          <div className={styles.work_item}>
            <div className={styles.work_item__img}>
              <img src="/static/images/work-item-1.png" alt="" />
            </div>
            <div className={styles.work_item__label}>
              Угловой светильник 3,49 метра:
            </div>
            <p>Длина: 1,2 м. + 1,86 м. + 0,4м;</p>
            <p>LED Источник света LUX, дневной;</p>
            <p>Встроенный бесконтактный диммер (сенсор);</p>
            <div className={styles.work_item__price}>
              Цена:{" "}
              <span className="purpure_text">
                5016 <strong>руб.</strong>
              </span>
            </div>
          </div>
          <div className={styles.work_item}>
            <div className={styles.work_item__img}>
              <img src="/static/images/work-item-2.png" alt="" />
            </div>
            <div className={styles.work_item__label}>
              Угловой светильник 3,9 метра:
            </div>
            <p>Длина: 1,33 м. + 1,57 м. + 0,9м;</p>
            <p>LED Источник света LUX, дневной;</p>
            <p>Встроенный бесконтактный диммер (сенсор);</p>
            <div className={styles.work_item__price}>
              Цена:{" "}
              <span className="purpure_text">
                7975 <strong>руб.</strong>
              </span>
            </div>
          </div>
          <div className={styles.work_item}>
            <div className={styles.work_item__img}>
              <img src="/static/images/work-item-3.png" alt="" />
            </div>
            <div className={styles.work_item__label}>
              Угловой светильник 3,47 метра:
            </div>
            <p>Длина: 1,54 м. + 1,03 м. + 0,9м;</p>
            <p>LED Источник света LUX, дневной;</p>
            <p>Встроенный бесконтактный диммер (сенсор);</p>
            <div className={styles.work_item__price}>
              Цена:{" "}
              <span className="purpure_text">
                8176 <strong>руб.</strong>
              </span>
            </div>
          </div>
          <div className={styles.work_item}>
            <div className={styles.work_item__img}>
              <img src="/static/images/work-item-4.png" alt="" />
            </div>
            <div className={styles.work_item__label}>
              Угловой светильник 4,55 метра:
            </div>
            <p>Длина: 1,05 м. + 2,1 м. + 1,4м.</p>
            <p>LED Источник света LUX, дневной;</p>
            <p>Встроенный бесконтактный диммер (сенсор);</p>
            <div className={styles.work_item__price}>
              Цена:{" "}
              <span className="purpure_text">
                12837 <strong>руб.</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
