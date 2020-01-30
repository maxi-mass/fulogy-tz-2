import React from "react";
import styles from "./LampConstructor.module.scss";
import RangePicker from "./RangePicker/RangePicker";
import KitchenType from "./KitchenType/KitchenType";
import KitchenClass from "./KitchenClass/KitchenClass";
import LampColor from "./LampColor/LampColor";
import Button from "../../common/Button/Button";

const LampConstructor = props => {
  return (
    <div className={styles.lamp_constructor}>
      <div className={styles.lamp_constructor_inner}>
        <RangePicker />
        <KitchenType />
        <KitchenClass />
        <LampColor />
        <Button>получить расчет</Button>
      </div>
    </div>
  );
};

export default LampConstructor;
