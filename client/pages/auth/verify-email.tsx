import styles from "../../styles/VerifyEmail.module.css";

import React, { useState } from "react";
import {
  CookieDocument,
  useConfirmMutation,
} from "../../src/generated/graphql";
import router, { useRouter } from "next/router";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import { client } from "../../providers/UrqlProvider";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const userCookie: string = context.req.cookies?.uid;
  const { data } = await client
    .query(CookieDocument, {
      cookie: userCookie ? userCookie : "",
    })
    .toPromise();
  if (data?.cookie === true) {
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}
const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { query } = useRouter();
  const [{ data, fetching }, verify] = useConfirmMutation();
  const verifyHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await verify({
      token: "confirm-email:" + (query as any)?.username,
      verificationCode: code,
    });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data) {
      if (data.confirm.error) {
        setError(data.confirm.error.message);
      } else {
        router.replace("/?next=profile");
      }
    }
    return () => {
      mounted = false;
    };
  }, [data]);
  return (
    <div className={styles.verify__container}>
      <Image src="/logo.png" alt="logo" width={100} height={100} />
      <form className={styles.verify} onSubmit={verifyHandler}>
        <h1>verify email</h1>
        <div className={styles.verify__input}>
          <p>
            please enter a <b>6 digit</b> verification code that we have sent to
            your email.
          </p>
          <div className={styles.verify__input__field}>
            <input
              maxLength={6}
              value={code.replace(/[^0-9-]/, "")}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              type="text"
              placeholder="000000"
            />
          </div>
        </div>
        {message && <p className={styles.verify__message}>{message}</p>}
        {error && <p className={styles.verify__error}>{error}</p>}
        <button type="submit" disabled={!code || fetching}>
          verify
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
