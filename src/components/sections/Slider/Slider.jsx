import React, { useState } from "react";
import styles from "./Slider.module.scss";

const Slider = props => {
  const [currentImage, setCurrentImage] = useState(1);
  const sliderHandler = direction => {
    switch (direction) {
      case "next": {
        if (currentImage < 6) {
          setCurrentImage(prev => prev + 1);
        }
        break;
      }
      case "prev": {
        if (currentImage > 1) {
          setCurrentImage(prev => prev - 1);
        }
        break;
      }
    }
  };
  return (
    <div className={styles.slider}>
      <div className={`${styles.slider__left} ${styles.slider__desc}`}>
        <div>Бесконтактная система управления</div>
        <div>Светодиоды высокой цветопередачи</div>
        <div>Алюминиевый корпус без перегрева</div>
      </div>
      <div className={styles.slider__center}>
        <div className={styles.slider__center_inner}>
          <div className={styles.center_inner__image}>
            <img
              src={`/static/images/slider/Photo-${currentImage}.jpg`}
              alt={`Photo-${currentImage}`}
            />
          </div>
          <div className={styles.center_inner__numberOf}>
            <span className="purpure_text">{currentImage}</span> / 6
          </div>
          <div className={styles.center_inner__buttons}>
            <div
              onClick={() => sliderHandler("prev")}
              className={styles.buttons__prev}
            >
              <img src="/static/images/arrow.png" alt="prev" />
            </div>
            <div
              onClick={() => sliderHandler("next")}
              className={styles.buttons__next}
            >
              <img src="/static/images/arrow.png" alt="next" />
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.slider__right} ${styles.slider__desc}`}>
        <div>Низкое энергопотребление</div>
        <div>Легко монтируется самостоятельно</div>
        <div>Удобно готовить</div>
      </div>
    </div>
  );
};

export default Slider;
