import React from "react";

import styles from "./Modal.module.css";
const Modal: React.FC<{
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ children, setOpen }) => {
  return <div className={styles.modal}>{children}</div>;
};

export default Modal;
