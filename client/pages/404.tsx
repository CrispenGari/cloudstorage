import React from "react";
import Link from "next/link";
import styles from "../styles/NotFoundPage.module.css";
import Image from "next/image";
const NotFoundPage = () => {
  return (
    <div className={styles.not__found__page}>
      <Image width={100} height={100} src="/logo.png" alt="logo" />
      <div className={styles.not__found__page__section}>
        <h1>
          4<span>0</span>4
        </h1>
        <p>Page Not Found</p>
      </div>
      <div className={styles.not__found__page__section}>
        <h1>Navigate</h1>
        <div>
          <Link href={"/"} replace>
            HOME
          </Link>
          <Link href={"/auth/login"} replace>
            LOGIN
          </Link>
          <Link href={"/auth/register"} replace>
            REGISTER
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
