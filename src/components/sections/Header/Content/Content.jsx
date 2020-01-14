import React from "react";
import styles from "./Content.module.css";
import Button from "../../../common/Button/Button";
import VideoButton from "./VideoButton/VideoButton";
import LampSlider from "./LampSlider/LampSlider";

const Content = props => {
  return (
    <div className={styles.header__content}>
      {/*-----CONTENT LEFT------*/}
      <div className={styles.content_left}>
        <h1>премиальные сенсорные светильники для кухни</h1>
        <p>
          <span className="purpure_text">8 лет</span> оснащаем Ваши кухни нашими
          светильниками <br /> по цене производителя.
        </p>
        <div className={styles.content_left__get_video}>
          <div className={styles.get_video__info}>
            <span className="purpure_text">Посмотрите</span> видеопрезентацию
            <br /> о наших светильниках!
          </div>
          <VideoButton />
        </div>
        <Button>онлайн конструктор</Button>
      </div>
      {/*-----CONTENT RIGHT------*/}
      <LampSlider />
    </div>
  );
};

export default Content;
