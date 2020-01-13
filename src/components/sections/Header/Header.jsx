import React from "react";
import styles from "./Header.module.css";
import Navbar from "./Navbar/Navbar";
import Content from "./Content/Content";

const Header = () => {
  return (
    <header className={styles.header}>
      <Navbar />
      <Content />
    </header>
  );
};

export default Header;
