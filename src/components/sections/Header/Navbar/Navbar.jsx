import React from "react";
import styles from "./Navbar.module.css";

const Navbar = props => {
  return (
    <div className={styles.header__navbar}>
      <div className={styles.navbar__logo}></div>
      <nav className={styles.navbar__nav}>
        <a className={styles.nav__link} href="#">
          Главная
        </a>
        <a className={styles.nav__link} href="#">
          Стоимость
        </a>
        <a className={styles.nav__link} href="#">
          Онлайн конструктор
        </a>
        <a className={styles.nav__link} href="#">
          Почему мы
        </a>
        <a className={styles.nav__link} href="#">
          Отзывы
        </a>
        <a className={styles.nav__link} href="#">
          Заказать
        </a>
      </nav>
      <div className={styles.navbar__phone}>
        <span className={styles.phone__text}>Заказать звонок</span>
        <span className={`${styles.phone__number} purpure_text`}>
          +7-(800)-505-65-33
        </span>
      </div>
    </div>
  );
};

export default Navbar;
