import React from "react";
import { Avatar } from "@material-ui/core";
import styles from "./Item.module.scss";
import { IconType } from "react-icons";

interface Props {
  content?: string | number;
  withUser?: boolean;
  title?: string;
  Icon?: IconType;
  subTitle?: String;
  dot?: boolean;
  theme?: string;
  user?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
const Item: React.FC<Props> = ({
  content,
  withUser,
  title,
  Icon,
  dot,
  theme,
  user,
  onClick,
}) => {
  const classTheme: string =
    theme === "dark" ? styles.darktheme : styles.lighttheme;
  if (withUser) {
    return (
      <div
        onClick={onClick}
        className={`${styles.header__item} ${classTheme} `}
      >
        <Avatar
          alt={user?.username}
          src={user?.profile?.avatar}
          className={styles.header__avatar}
        />
        <div>
          <h1 className={styles.header__displayName}>{user?.username}</h1>
        </div>
      </div>
    );
  }
  return (
    <div
      onClick={onClick}
      className={`${styles.header__item} ${classTheme} `}
      title={title}
    >
      <div className={styles.header__icon__button__badge}>
        {dot ? (
          <span className={styles.header__icon__button__badge__dot}></span>
        ) : Boolean(content) ? (
          <span>{content}</span>
        ) : null}
        <Icon className={styles.header__item__icon} />
      </div>
      <div>
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default Item;
