import '../styles/globals.css';
import Layout from 'components/common/Layout';

const MyApp = ({ Component, pageProps }: { Component: any; pageProps: any }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);
export default MyApp;
