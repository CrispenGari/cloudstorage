import React from "react";
import { useLogoutMutation, useUserQuery } from "../../src/generated/graphql";

import styles from "./LogoutCard.module.css";
const LogoutCard = () => {
  const [{ data }] = useUserQuery();
  const [_, signout] = useLogoutMutation();
  const logoutHandler = async () => {
    await signout().then(() => {
      window.location.reload();
    });
  };
  return (
    <div className={styles.logout__card}>
      <h1>Logout as {data?.user?.username}</h1>
      <p>{data?.user?.email}</p>
      <button onClick={logoutHandler}>LOGOUT</button>
    </div>
  );
};

export default LogoutCard;
