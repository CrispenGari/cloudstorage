import { GetServerSidePropsContext, NextPage } from "next";
import styles from "./Profile.module.css";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/minor/flesh/Header/Header";
import Banner from "../../components/minor/flesh/Banner/Banner";
import UserInfo from "../../components/minor/flesh/UserInfo/UserInfo";
import Modal from "../../components/common/Modal/Modal";
import ProfilePictureCard from "../../components/minor/flesh/ProfilePictureCard/ProfilePictureCard";
import Statistics from "../../components/minor/flesh/Statistics/Statistics";
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
const Profile: NextPage<Props> = () => {
  const router = useRouter();
  const { query } = router;
  const [edit, setEdit] = React.useState(false);
  return (
    <div className={styles.profile}>
      <Header theme="light" />
      {edit && (
        <Modal>
          <ProfilePictureCard
            username={String(query?.username)}
            setEdit={setEdit}
          />
        </Modal>
      )}
      <div className={styles.profile__main}>
        <Banner />
        <UserInfo setEdit={setEdit} />
        <Statistics />
        <div className={styles.profile__storage}>
          <StorageCard />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
