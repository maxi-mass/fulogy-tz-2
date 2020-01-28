import React, { useState, useEffect } from "react";
import styles from "./VideoButton.module.scss";

const VideoButton = props => {
  const [yellowСircle, setYellowСircle] = useState({
    opacity: 1.0,
    opDirection: "down"
  });
  const [pinkСircle, setPinkСircle] = useState({
    opacity: 0.0,
    opDirection: "up"
  });

  const changeCircle = (circle, setCircle) => {
    if (circle.opDirection === "down" && circle.opacity > 0.2) {
      setCircle(prev => ({
        opacity: Number((prev.opacity - 0.03).toFixed(2)),
        opDirection: prev.opDirection
      }));
    } else if (circle.opDirection === "down" && circle.opacity <= 0.2) {
      setCircle(prev => ({ opacity: prev.opacity, opDirection: "up" }));
    } else if (circle.opDirection === "up" && circle.opacity < 1.0) {
      setCircle(prev => ({
        opacity: Number((prev.opacity + 0.03).toFixed(2)),
        opDirection: prev.opDirection
      }));
    } else if (circle.opDirection === "up" && circle.opacity >= 1) {
      setCircle(prev => ({
        opacity: prev.opacity,
        opDirection: "down"
      }));
    }
  };

  useEffect(() => {
    setTimeout(() => changeCircle(yellowСircle, setYellowСircle), 35);
  }, [yellowСircle]);
  useEffect(() => {
    setTimeout(() => changeCircle(pinkСircle, setPinkСircle), 35);
  }, [pinkСircle]);

  return (
    <div
      style={{
        background: `rgba(255, 249, 245, ${pinkСircle.opacity})`
      }}
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
  );
};

export default VideoButton;
