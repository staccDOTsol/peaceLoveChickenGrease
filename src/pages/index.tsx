import { FeeProvider } from "contexts/FeeContext";
import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Bitcoin Gumball Machine</title>
        <meta
          name="description"
          content="Bitcoin Gumball Machine"
        />
        <link rel="preload" href="Mona-Sans.woff2" as="font" type="font/woff2"></link>
      </Head>
        <HomeView />
    </div>
  );
};

export default Home;
