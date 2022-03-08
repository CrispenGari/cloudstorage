import React from "react";
import styles from "./Header.module.scss";
import { AiOutlineSetting } from "react-icons/ai";
import { MdPowerSettingsNew } from "react-icons/md";
import Item from "./Item/Item";
import {
  useLogoutMutation,
  useUserQuery,
} from "../../../../src/generated/graphql";
import { useRouter } from "next/router";
import Image from "next/image";
interface Props {
  theme: string;
}
const Header: React.FC<Props> = ({ theme }) => {
  const classTheme: string =
    theme === "dark" ? styles.darktheme : styles.lighttheme;
  const [{ data }, __] = useUserQuery();
  const [_, signout] = useLogoutMutation();
  const router = useRouter();

  const { asPath } = router;

  return (
    <div className={`${styles.header} ${classTheme}`}>
      <Image
        width={50}
        height={50}
        className={styles.header__logo}
        src="/logo.png"
        onClick={() => {
          router.replace("/", "/", {});
        }}
        alt="logo"
      />

      <div className={styles.header__right}>
        <Item
          user={data?.user}
          theme={theme}
          withUser
          subTitle="open your profile"
          onClick={() => {
            if (!data.user.isLoggedIn) {
              return;
            }

            router.push(
              {
                pathname: "/profile/[username]",
                query: { username: data.user.username },
              },
              null,
              { shallow: false }
            );
          }}
        />
        <Item
          theme={theme}
          title="settings"
          Icon={AiOutlineSetting}
          subTitle="open your settings"
          onClick={() => {
            if (!data.user.isLoggedIn) {
              return;
            }
            router.push(
              {
                pathname: "/settings/[username]",
                query: { username: data.user.username },
              },
              null,
              { shallow: false }
            );
          }}
        />
        <Item
          theme={theme}
          title="sign out"
          Icon={MdPowerSettingsNew}
          subTitle="sign out of the app"
          onClick={async () => {
            await signout().then(() => {
              window.location.reload();
            });
          }}
        />
      </div>
    </div>
  );
};

export default Header;
