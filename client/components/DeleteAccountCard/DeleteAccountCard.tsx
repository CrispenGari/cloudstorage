import React from "react";
import {
  useDeleteAccountMutation,
  useLogoutMutation,
  useUserQuery,
} from "../../src/generated/graphql";
import styles from "./DeleteAccountCard.module.css";
const DeleteAccountCard = () => {
  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [error, setError] = React.useState("");

  const [{ fetching, data }, deleteAccount] = useDeleteAccountMutation();
  const [_, signout] = useLogoutMutation();

  const [{ data: userData }] = useUserQuery();
  const deleteAccountHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await deleteAccount({
      input: {
        email: email,
        password: pwd,
      },
    });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && userData) {
      setEmail(userData?.user?.email);
    }
    return () => {
      mounted = false;
    };
  }, [userData]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data) {
      if (data.deleteAccount?.error) {
        setError(data.deleteAccount.error.message);
      } else {
        setError("");
        signout().then(() => {
          window.location.reload();
        });
      }
    }
    return () => {
      mounted = false;
    };
  }, [data, signout]);
  return (
    <form className={styles.delete__account} onSubmit={deleteAccountHandler}>
      <h1>Delete Account</h1>
      <p>
        By deleting your account, you will loose all your files on the cloud
        storage.
      </p>
      <div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email Address"
        />
        <input
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </div>
      <p>{error}</p>
      <button type="submit">DELETE ACCOUNT</button>
    </form>
  );
};

export default DeleteAccountCard;
