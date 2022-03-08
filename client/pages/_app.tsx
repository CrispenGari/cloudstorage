import "../styles/globals.css";
import Layout from "../components/major/Layout/Layout";
import UrqlProvider from "../providers/UrqlProvider";
import ReduxProvider from "../providers/ReduxProvider";
const CloudStorage = ({ Component, pageProps }) => {
  return (
    <UrqlProvider>
      <ReduxProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ReduxProvider>
    </UrqlProvider>
  );
};
export default CloudStorage;
