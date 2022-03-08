import React from "react";
import H from "../Head/Head";
import styles from "./Layout.module.css";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <H />
      <div className={styles.layout}>{children}</div>
    </>
  );
};
export default Layout;
