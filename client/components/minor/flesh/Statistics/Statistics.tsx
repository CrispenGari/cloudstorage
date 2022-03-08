import React from "react";
import { useUserQuery } from "../../../../src/generated/graphql";

import styles from "./Statistics.module.css";
const Statistics = () => {
  const [{ data, fetching }] = useUserQuery({ requestPolicy: "network-only" });
  return (
    <div className={styles.statistics}>
      {fetching && (
        <div className={styles.statistics__loading}>
          <p>loading...</p>
        </div>
      )}
      <div className={styles.statistics__items}>
        <div className={styles.statistics__item}>
          <h1>pictures</h1>
          <p>{data?.user?.pictures?.length ?? 0}</p>
        </div>
        <div className={styles.statistics__item}>
          <h1>musics</h1>
          <p>{data?.user?.musics?.length ?? 0}</p>
        </div>
        <div className={styles.statistics__item}>
          <h1>videos</h1>
          <p>{data?.user?.videos?.length ?? 0}</p>
        </div>
      </div>
      <div className={styles.statistics__items}>
        <div className={styles.statistics__item}>
          <h1>miscellaneous</h1>
          <p>{data?.user?.miscellaneous?.length ?? 0}</p>
        </div>
        <div className={styles.statistics__item}>
          <h1>documents</h1>
          <p>{data?.user?.documents?.length ?? 0}</p>
        </div>
        <div className={styles.statistics__item}>
          <h1>trash</h1>
          <p>{data?.user?.trash?.length ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
