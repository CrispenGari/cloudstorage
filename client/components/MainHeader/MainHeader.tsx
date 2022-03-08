import React from "react";
import { FaFolder } from "react-icons/fa";

import styles from "./MainHeader.module.css";
import Image from "next/image";
interface Props {
  folder: string;
  setFolder: React.Dispatch<React.SetStateAction<string>>;
}
const MainHeader: React.FC<Props> = ({ folder, setFolder }) => {
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <FaFolder className={styles.header__icon} />
        <h1>
          <span onClick={() => setFolder("")}>Drive</span>/<span>{folder}</span>
        </h1>
      </div>
      <div className={styles.header__right}>
        <Image width={30} height={30} src="/logo.png" alt="logo" />
      </div>
    </div>
  );
};

export default MainHeader;
