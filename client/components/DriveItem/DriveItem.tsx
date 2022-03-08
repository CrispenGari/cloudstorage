import React from "react";

import styles from "./DriveItem.module.css";

import { FaFolder } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { Tooltip } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setSelectedFiles } from "../../actions";

interface Props {
  title: string;
  active?: boolean;
  setFolder?: React.Dispatch<React.SetStateAction<string>>;
}

const DriveItem: React.FC<Props> = ({ title, active, setFolder }) => {
  const dispatch = useDispatch();
  return (
    <Tooltip
      title={title}
      onClick={() => {
        setFolder(title);
        if (!active) {
          dispatch(setSelectedFiles([]));
        }
      }}
    >
      <div className={active ? styles.drive__item__active : styles.drive__item}>
        {title === "Trash" ? (
          <BsTrash className={styles.drive__item__icon} />
        ) : (
          <FaFolder className={styles.drive__item__icon} />
        )}
        <h1>{title}</h1>
      </div>
    </Tooltip>
  );
};

export default DriveItem;
