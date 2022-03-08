import React from "react";
import styles from "./Skeleton.module.sass";
const Skeleton: React.FC<{
  type: string;
  theme: string;
}> = ({ type, theme }) => {
  const classTheme: string =
    theme === "dark" ? styles.darktheme : styles.lighttheme;

  let className = `${styles.skeleton} ${classTheme}`;
  if (type === "avatar") {
    className = `${styles.skeleton} ${styles.avatar}  ${classTheme}`;
  } else if (type === "icon") {
    className = `${styles.skeleton} ${styles.icon}  ${classTheme}`;
  } else if (type === "text-small") {
    className = `${styles.skeleton} ${styles.text__small} ${classTheme}`;
  } else if (type === "text-small-short") {
    className = `${styles.skeleton} ${styles.text__small__short} ${classTheme}`;
  } else if (type === "fleet") {
    className = `${styles.skeleton} ${styles.fleet} ${classTheme}`;
  } else if (type === "textarea") {
    className = `${styles.skeleton} ${styles.textarea} ${classTheme}`;
  } else if (type === "icon-button-small") {
    className = `${styles.skeleton} ${styles.icon__button__small} ${classTheme}`;
  } else if (type === "icon-button-normal") {
    className = `${styles.skeleton} ${styles.icon__button__normal} ${classTheme}`;
  } else if (type === "button") {
    className = `${styles.skeleton} ${styles.button} ${classTheme}`;
  } else if (type === "text-medium-short") {
    className = `${styles.skeleton} ${styles.text__medium__short} ${classTheme}`;
  } else if (type === "username") {
    className = `${styles.skeleton} ${styles.username} ${classTheme}`;
  } else if (type === "post-image") {
    className = `${styles.skeleton} ${styles.post__image} ${classTheme}`;
  } else if (type === "text-tiny") {
    className = `${styles.skeleton} ${styles.text__tiny} ${classTheme}`;
  } else if (type === "text-input") {
    className = `${styles.skeleton} ${styles.text__input} ${classTheme}`;
  } else if (type === "time-stamp") {
    className = `${styles.skeleton} ${styles.time__stamp} ${classTheme}`;
  } else {
    className = `${styles.skeleton} ${styles.text__medium} ${classTheme}`;
  }
  return <div className={className}></div>;
};

export default Skeleton;
