import React from "react";
import styles from "../../styles/Register.module.css";
import { useRef, useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { CgLock } from "react-icons/cg";
import { BsPersonCheck } from "react-icons/bs";
import Input from "../../components/common/RegisterInput/RegisterInput";
import { useRouter } from "next/router";
import Image from "next/image";
import { client } from "../../providers/UrqlProvider";
import { GetServerSidePropsContext } from "next";
import {
  CookieDocument,
  useRegisterMutation,
} from "../../src/generated/graphql";
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
const Register = () => {
  const router = useRouter();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [confPasswordError, setConfPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [{ fetching, data }, register] = useRegisterMutation();

  const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPassword("");
      setPassword("");
      return setConfPasswordError("the two password does not match.");
    }
    await register({
      input: {
        email,
        password,
        username,
      },
    });
  };
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data) {
      if (data.register.error) {
        if (data.register.error.field === "password") {
          setEmailError("");
          setUsernameError("");
          setConfPasswordError("");
          setConfirmPassword("");
          setPassword("");
          return setPasswordMessage(data.register.error.message);
        }
        if (data.register.error.field === "email") {
          setPasswordMessage("");
          setUsernameError("");
          setConfPasswordError("");
          return setEmailError(data.register.error.message);
        }
        if (data.register.error.field === "username") {
          setEmailError("");
          setPasswordMessage("");
          setConfPasswordError("");
          return setUsernameError(data.register.error.message);
        }
      } else {
        setEmailError("");
        setPasswordMessage("");
        setConfPasswordError("");
        setUsernameError("");
        router.replace(
          `/auth/verify-email?username=${username.toLocaleLowerCase().trim()}`
        );
      }
    }
    return () => {
      mounted = false;
    };
  }, [data, router, username]);

  return (
    <div className={styles.register__container}>
      <Image src="/logo.png" alt="logo" width={100} height={100} />
      <form className={styles.register} onSubmit={registerHandler}>
        <h1>register</h1>
        <Input
          LeftIcon={HiOutlineMail}
          type="email"
          placeholder="email"
          value={email}
          focus={true}
          setValue={setEmail}
          inputError={emailError}
        />
        <Input
          LeftIcon={BsPersonCheck}
          type="text"
          placeholder="username"
          value={username}
          setValue={setUsername}
          inputError={usernameError}
        />
        <Input
          LeftIcon={CgLock}
          type="password"
          placeholder="password"
          inputRef={passwordRef}
          value={password}
          setValue={setPassword}
          RightIcon={!showPassword ? IoMdEyeOff : IoMdEye}
          rightIconTitle={!showPassword ? "show password" : "hide password"}
          changeInputType={setShowPassword}
          inputError={passwordMessage}
        />
        <Input
          LeftIcon={CgLock}
          type="password"
          placeholder="confirm password"
          inputRef={confirmPasswordRef}
          value={confirmPassword}
          setValue={setConfirmPassword}
          RightIcon={!showConfPassword ? IoMdEyeOff : IoMdEye}
          rightIconTitle={!showConfPassword ? "show password" : "hide password"}
          changeInputType={setShowConfPassword}
          inputError={confPasswordError}
        />
        <button type="submit" disabled={fetching || !email}>
          register
        </button>
        <div className={styles.register__bottom}>
          <p>already have an account?</p>
          <button
            type={"button"}
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
