import { Tooltip } from "@material-ui/core";
import React from "react";
import { useUserQuery } from "../../src/generated/graphql";
import { fileDisplaySize } from "../../utils";

import styles from "./StorageCard.module.css";
const StorageCard = () => {
  const [{ fetching, data }] = useUserQuery({
    requestPolicy: "network-only",
  });
  return (
    <div className={styles.storage}>
      <h1>Storage Usage</h1>
      <Tooltip title={fileDisplaySize(data?.user?.usedStorage) + " used"}>
        <div className={styles.storage__bar}>
          <div
            style={{
              width: `${
                100 * (data?.user?.usedStorage / data?.user?.maxStorageSize)
              }%`,
              height: "100%",
              background:
                100 * (data?.user?.usedStorage / data?.user?.maxStorageSize) >
                98
                  ? "red"
                  : "#fecb28",
              borderRadius: 999,
            }}
          />
        </div>
      </Tooltip>
      <div className={styles.storage__key}>
        <div>
          <div />
          <p>free</p>
        </div>
        <div>
          <div />
          <p>used</p>
        </div>
        <div>
          <div />
          <p>full</p>
        </div>
      </div>
      <p>
        ~{fileDisplaySize(data?.user?.maxStorageSize - data?.user?.usedStorage)}{" "}
        free of {fileDisplaySize(data?.user?.maxStorageSize)}
      </p>
    </div>
  );
};

export default StorageCard;
