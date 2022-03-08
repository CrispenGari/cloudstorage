import { GetServerSidePropsContext, NextPage } from "next";
import React, { useRef, useState } from "react";
import styles from "../../styles/Login.module.css";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { CgLock } from "react-icons/cg";
import { HiOutlineMail } from "react-icons/hi";
import { useRouter } from "next/router";
import Link from "next/link";

import Image from "next/image";
import { CookieDocument, useLoginMutation } from "../../src/generated/graphql";
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
const Login: NextPage<{}> = ({}) => {
  const router = useRouter();
  const emailRef = useRef(null);
  const [{ fetching, data }, login] = useLoginMutation();
  const passwordRef = useRef(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({
      input: {
        usernameOrEmail: email,
        password,
      },
    });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data) {
      if (data.login.error) {
        setPassword("");
      } else {
        router.replace("/");
      }
    }
    return () => {
      mounted = false;
    };
  }, [data, router]);
  return (
    <div className={styles.login__container}>
      <Image src="/logo.png" alt="logo" width={100} height={100} />
      <form className={styles.login} onSubmit={loginHandler}>
        <h1>login</h1>

        <div className={styles.login__input}>
          <div className={styles.login__input__field}>
            <HiOutlineMail className={styles.login__input__icon} />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
              type="text"
              placeholder="username, email or phone number"
            />
          </div>
        </div>
        <div className={styles.login__input}>
          <div className={styles.login__input__field}>
            <CgLock className={styles.login__input__icon} />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={passwordRef}
              type="password"
              placeholder="password"
            />
            {!showPassword ? (
              <IoMdEyeOff
                title="show password"
                onClick={() => {
                  passwordRef.current.setAttribute("type", "text");
                  setShowPassword(true);
                }}
                className={styles.login__input__field__icon}
              />
            ) : (
              <IoMdEye
                title="hide password"
                onClick={() => {
                  passwordRef.current.setAttribute("type", "password");
                  setShowPassword(false);
                }}
                className={styles.login__input__field__icon}
              />
            )}
          </div>
          <p>{(data?.login?.error as any)?.message}</p>
        </div>
        <p className={styles.login__forgot__password}>
          <Link href="/auth/forgot-password">forgot password?</Link>
        </p>
        <button type="submit" disabled={!email || fetching}>
          login
        </button>
        <div className={styles.login__bottom}>
          <p>new user to this app?</p>
          <button
            type="button"
            onClick={() => {
              router.push("/auth/register");
            }}
          >
            create account
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
