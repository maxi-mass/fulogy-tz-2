import React from "react";
import styles from "./Header.module.scss";
import Navbar from "./Navbar/Navbar";
import Content from "./Content/Content";

const Header = () => {
  return (
    <header className={styles.header}>
      <Navbar />
      <Content />
      <div className={styles.header__props}>
        <div className={styles.header__props_prop}>
          <div className="icon">
            <img src="/static/images/prop-1.png" />
          </div>
          <div className="prop_desc">
            Установка под размер Вашей кухни за 72 часа;
          </div>
        </div>
        <div className={styles.header__props_prop}>
          <div className="icon">
            <img src="/static/images/prop-2.png" />
          </div>
          <div className="prop_desc">Гарантия 5 лет;</div>
        </div>
        <div className={styles.header__props_prop}>
          <div className="icon">
            <img src="/static/images/prop-3.png" />
          </div>
          <div className="prop_desc">
            Бесконтактное <br /> управление светом;
          </div>
        </div>
        <div className={styles.header__props_prop}>
          <div className="icon1">
            <img src="/static/images/prop-4.png" />
          </div>
          <div className="prop_desc"> Эксклюзивность.</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
