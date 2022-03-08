import React from "react";
import Animation from "../../animations/Animation";
import Skeleton from "../../skeletons/Skeleton";
import styles from "./Header.module.css";
import Image from "next/image";
interface Props {
  theme: string;
}
const HeaderSkeleton: React.FC<Props> = ({ theme }) => {
  const classTheme: string =
    theme === "dark" ? styles.darktheme : styles.lighttheme;
  return (
    <div className={`${styles.header__skeleton} ${classTheme}`}>
      <Image
        className={styles.header__skeleton__logo}
        width={50}
        height={50}
        src="/logo.png"
        alt="logo"
      />
      <div className={styles.header__right__skeleton}>
        <div>
          <Skeleton theme={theme} type="avatar" />
          <Skeleton theme={theme} type="text-medium" />
        </div>
        <div>
          <Skeleton theme={theme} type="icon" />
          <Skeleton theme={theme} type="text-medium" />
        </div>
        <div>
          <Skeleton theme={theme} type="icon" />
          <Skeleton theme={theme} type="text-medium" />
        </div>
        <div>
          <Skeleton theme={theme} type="icon" />
          <Skeleton theme={theme} type="text-medium" />
        </div>
        <div>
          <Skeleton theme={theme} type="icon" />
          <Skeleton theme={theme} type="text-medium" />
        </div>
        <div>
          <Skeleton theme={theme} type="icon" />
          <Skeleton theme={theme} type="text-medium" />
        </div>
      </div>
      <Animation theme={theme} />
    </div>
  );
};

export default HeaderSkeleton;
