import { NextPage } from "next";
import React from "react";
import styles from "../../styles/ForgotPassword.module.css";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { useRouter } from "next/router";
import { useRequestForgotPasswordEmailMutation } from "../../src/generated/graphql";

import Image from "next/image";
interface Props {}
const ForgotPassword: NextPage<Props> = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const [{ fetching, data }, forgotPassword] =
    useRequestForgotPasswordEmailMutation();
  const forgotPasswordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      await forgotPassword({
        email,
      });
    }
  };
  return (
    <div className={styles.reset__container}>
      <Image src="/logo.png" alt="logo" width={100} height={100} />
      <form className={styles.reset} onSubmit={forgotPasswordHandler}>
        <h1>forgot password</h1>
        <div className={styles.reset__input}>
          <p>Your password reset link will be send to this email.</p>
          <div className={styles.reset__input__field}>
            <HiOutlineMail className={styles.reset__input__icon} />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
            />
          </div>
        </div>

        {data?.sendForgotPasswordEmail?.success ? (
          <p className={styles.reset__message}>
            {data?.sendForgotPasswordEmail?.message}
          </p>
        ) : (
          <p className={styles.reset__error}>
            {data?.sendForgotPasswordEmail?.message}
          </p>
        )}

        <button type="submit" disabled={!email || fetching}>
          reset
        </button>

        <div className={styles.reset__register__button}>
          <p>OR</p>
          <div>
            <button
              type="button"
              onClick={() => {
                setEmail("");
                router.push("/auth/register");
              }}
            >
              register
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail("");
                router.push("/auth/login");
              }}
            >
              login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
