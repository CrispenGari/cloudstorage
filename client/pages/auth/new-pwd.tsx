import Input from "../../components/common/RegisterInput/RegisterInput";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { CgLock } from "react-icons/cg";

import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useResetPasswordMutation } from "../../src/generated/graphql";
import Image from "next/image";
import styles from "../../styles/NewPassword.module.css";
const NewPassword = () => {
  const router = useRouter();

  const { query } = router;
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const [passwordMessage, setPasswordMessage] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [{ fetching, data }, resetPassword] = useResetPasswordMutation();
  const resetPasswordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPassword("");
      setPassword("");
      return setPasswordMessage("the two password does not match.");
    }
    await resetPassword({
      input: {
        password,
        username: (query as any)?.username,
        token: (query as any)?.token,
      },
    });

    if (data?.changePassword.success === true) {
      router.replace("/auth/login");
      return;
    } else {
      setPassword("");
      setConfirmPassword("");
    }
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data) {
      setPasswordMessage(data?.changePassword?.error?.message ?? "");
      if (data?.changePassword?.success === true) {
        router.replace("/auth/login");
      }
    }
    return () => {
      mounted = false;
    };
  }, [data, router]);

  return (
    <div className={styles.new__password__container}>
      <Image src="/logo.png" alt="logo" width={100} height={100} />
      <form className={styles.new__password} onSubmit={resetPasswordHandler}>
        <h1>change password</h1>
        <Input
          LeftIcon={CgLock}
          type="password"
          placeholder="password"
          inputRef={passwordRef}
          value={password}
          setValue={setPassword}
          label="password"
          RightIcon={!showPassword ? IoMdEyeOff : IoMdEye}
          rightIconTitle={!showPassword ? "show password" : "hide password"}
          changeInputType={setShowPassword}
        />
        <Input
          LeftIcon={CgLock}
          type="password"
          placeholder="confirm password"
          inputRef={confirmPasswordRef}
          value={confirmPassword}
          setValue={setConfirmPassword}
          label="confirm password"
          RightIcon={!showConfPassword ? IoMdEyeOff : IoMdEye}
          rightIconTitle={!showConfPassword ? "show password" : "hide password"}
          changeInputType={setShowConfPassword}
        />
        <p className={styles.new__password__error__msg}>{passwordMessage}</p>
        <button type="submit" disabled={fetching || !password}>
          change password and login
        </button>
      </form>
    </div>
  );
};

export default NewPassword;
