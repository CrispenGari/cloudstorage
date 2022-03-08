import React from "react";

import styles from "./Modal.module.css";
const Modal: React.FC = ({ children }) => {
  return <div className={styles.modal}>{children}</div>;
};

export default Modal;
