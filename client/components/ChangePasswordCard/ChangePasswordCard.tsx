import React from "react";
import styles from "./ChangePasswordCard.module.css";

import {
  useChangePasswordSettingMutation,
  useLogoutMutation,
} from "../../src/generated/graphql";
const ChangePasswordCard = () => {
  const [oldPwd, setOldPwd] = React.useState("");
  const [newPwd, setNewPwd] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  const [error, setError] = React.useState("");
  const [{ data, fetching }, changePassword] =
    useChangePasswordSettingMutation();

  const [_, logoutHandler] = useLogoutMutation();
  const changePasswordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await changePassword({
      input: {
        newPassword: newPwd,
        oldPassword: oldPwd,
        confirmPassword: confirm,
      },
    });
  };
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data) {
      if (data.changePasswordSetting?.error) {
        setError(data.changePasswordSetting.error.message);
        setNewPwd("");
        setOldPwd("");
        setConfirm("");
      } else {
        setError("");
        logoutHandler().then(() => window.location.reload());
      }
    }

    return () => {
      mounted = false;
    };
  }, [data, logoutHandler]);
  return (
    <form className={styles.change__password} onSubmit={changePasswordHandler}>
      <h1>Change Password</h1>
      <p>
        By changing the password you will be required to login again with new
        password.
      </p>
      <div>
        <input
          value={oldPwd}
          onChange={(e) => setOldPwd(e.target.value)}
          type="password"
          placeholder="Old Password"
        />
      </div>
      <div>
        <input
          value={newPwd}
          onChange={(e) => setNewPwd(e.target.value)}
          type="password"
          placeholder="New Password"
        />
        <input
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          type="password"
          placeholder="Confirm New Password"
        />
      </div>
      <p>{error}</p>
      <button type="submit" disabled={fetching}>
        CHANGE AND LOGIN
      </button>
    </form>
  );
};

export default ChangePasswordCard;
