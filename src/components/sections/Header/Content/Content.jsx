import React, { useState, useEffect } from "react";
import styles from "./Content.module.css";
import Button from "../../../common/Button/Button";

const Content = props => {
  const [lampColor, setLampColor] = useState("gold");
  const [yellowСircle, setYellowСircle] = useState({
    opacity: 1.0,
    opDirection: "down"
  });
  useEffect(() => {
    setTimeout(() => {
      if (yellowСircle.opDirection === "down" && yellowСircle.opacity > 0.2) {
        setYellowСircle(prev => ({
          opacity: Number((prev.opacity - 0.03).toFixed(2)),
          opDirection: prev.opDirection
        }));
      } else if (
        yellowСircle.opDirection === "down" &&
        yellowСircle.opacity <= 0.2
      ) {
        setYellowСircle(prev => ({ opacity: prev.opacity, opDirection: "up" }));
      } else if (
        yellowСircle.opDirection === "up" &&
        yellowСircle.opacity < 1.0
      ) {
        setYellowСircle(prev => ({
          opacity: Number((prev.opacity + 0.03).toFixed(2)),
          opDirection: prev.opDirection
        }));
      } else if (
        yellowСircle.opDirection === "up" &&
        yellowСircle.opacity >= 1
      ) {
        setYellowСircle(prev => ({
          opacity: prev.opacity,
          opDirection: "down"
        }));
      }
    }, 35);
  }, [yellowСircle]);
  return (
    <div className={styles.header__content}>
      {/*-----CONTENT LEFT------*/}
      <div className={styles.content_left}>
        <h1>премиальные сенсорные светильники для кухни</h1>
        <p>
          <span className="purpure_text">8 лет</span> оснащаем Ваши кухни нашими
          светильниками по цене производителя.
        </p>
        <div className={styles.content_left__get_video}>
          <div className={styles.get_video__info}>
            <span className="purpure_text">Посмотрите</span> видеопрезентацию
            <br /> о наших светильниках!
          </div>
          <div
            className={styles.get_video__button}
            onClick={() => console.log("Video")}
          >
            <div
              style={{
                background: `rgba(255, 207, 13, ${yellowСircle.opacity})`
              }}
              className={styles.get_video__button_yellow}
            >
              <div className={styles.get_video__button_bg}></div>
            </div>
          </div>
        </div>
        <Button>онлайн конструктор</Button>
      </div>
      {/*-----CONTENT RIGHT------*/}
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
    </div>
  );
};

export default Content;
