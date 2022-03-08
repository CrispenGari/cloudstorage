import { GetServerSidePropsContext, NextPage } from "next";
import styles from "./Settings.module.css";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/minor/flesh/Header/Header";
import Modal from "../../components/Modal/Modal";
import ProfilePictureCard from "../../components/minor/flesh/ProfilePictureCard/ProfilePictureCard";
import Banner from "../../components/minor/flesh/Banner/Banner";
import UserInfo from "../../components/minor/flesh/UserInfo/UserInfo";
import Statistics from "../../components/minor/flesh/Statistics/Statistics";
import ChangePasswordCard from "../../components/ChangePasswordCard/ChangePasswordCard";
import DeleteAccountCard from "../../components/DeleteAccountCard/DeleteAccountCard";
import LogoutCard from "../../components/LogoutCard/LogoutCard";
import Footer from "../../components/Footer/Footer";
import { CookieDocument } from "../../src/generated/graphql";
import { client } from "../../providers/UrqlProvider";
import StorageCard from "../../components/StorageCard/StorageCard";
interface Props {
  query: any;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const userCookie: string = context.req.cookies?.uid;
  const { data } = await client
    .query(CookieDocument, {
      cookie: userCookie ? userCookie : "",
    })
    .toPromise();
  if (data?.cookie === false) {
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
const Settings: NextPage<Props> = () => {
  const router = useRouter();
  const { query } = router;
  const [edit, setEdit] = React.useState(false);
  return (
    <div className={styles.settings}>
      <Header theme="light" />
      {edit && (
        <Modal>
          <ProfilePictureCard
            username={String(query?.username)}
            setEdit={setEdit}
          />
        </Modal>
      )}
      <div className={styles.settings__main}>
        <Banner />
        <UserInfo setEdit={setEdit} />
        <Statistics />
        <div className={styles.settings__storage}>
          <StorageCard />
        </div>
        <LogoutCard />
        <ChangePasswordCard />
        <DeleteAccountCard />
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
