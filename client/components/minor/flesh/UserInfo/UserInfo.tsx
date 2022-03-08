import React from "react";
import { useUserQuery } from "../../../../src/generated/graphql";
import styles from "./UserInfo.module.css";
const UserInfo: React.FC<{
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setEdit }) => {
  const [{ fetching, data }] = useUserQuery({ requestPolicy: "network-only" });
  return (
    <div className={styles.user__info}>
      {fetching && (
        <div className={styles.user__info__loading}>
          <p>loading...</p>
        </div>
      )}
      <div className={styles.user__info__main}>
        <div className={styles.user__info__main__top}>
          <h1>
            {data?.user?.username} •{" "}
            <span>{data?.user?.profile?.email} • </span>
            <span>{data?.user?.profile?.admin ? "admin" : "user"}</span>
          </h1>
          <p>{data?.user?.profile?.phoneNumber}</p>
        </div>
        <div className={styles.user__info__main__bottom}>
          <button onClick={() => setEdit(true)}>edit</button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
