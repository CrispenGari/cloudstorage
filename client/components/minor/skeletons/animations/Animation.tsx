import styles from "./Animation.module.css";

import React from "react";
interface Props {
  theme: string;
}

const Animation: React.FC<Props> = ({ theme }) => {
  const classTheme: string =
    theme === "dark" ? styles.darktheme : styles.lighttheme;

  return (
    <div className={`${styles.animation} ${classTheme}`}>
      <div className={styles.animation__magic}></div>
    </div>
  );
};

export default Animation;
