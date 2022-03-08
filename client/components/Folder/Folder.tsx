import React from "react";
import { FaFolder } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";

import styles from "./Folder.module.css";

interface Props {
  title: string;

  setFolder: React.Dispatch<React.SetStateAction<string>>;
}

const Folder: React.FC<Props> = ({ title, setFolder }) => {
  return (
    <div className={styles.folder} onClick={() => setFolder(title)}>
      {title === "Trash" ? (
        <BsTrash className={styles.folder__icon} />
      ) : (
        <FaFolder className={styles.folder__icon} />
      )}

      <h1>{title}</h1>
    </div>
  );
};

export default Folder;
