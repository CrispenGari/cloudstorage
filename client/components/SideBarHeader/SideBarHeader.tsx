import React from "react";
import { GrOnedrive } from "react-icons/gr";
import styles from "./SideBarHeader.module.css";

const SideBarHeader: React.FC<{
  setFolder?: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setFolder }) => {
  return (
    <div className={styles.header}>
      <GrOnedrive
        className={styles.header__icon}
        onClick={() => {
          setFolder("");
        }}
      />
      <h1
        onClick={() => {
          setFolder("");
        }}
      >
        Drive
      </h1>
    </div>
  );
};

export default SideBarHeader;
