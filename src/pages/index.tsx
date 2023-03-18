import { FeeProvider } from "contexts/FeeContext";
import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Meerkat Millionaires Country Club - Ordinals</title>
        <meta
          name="description"
          content="Meerkat Millionaires Country Club - Ordinals"
        />
      </Head>
      <FeeProvider>
      <HomeView />
      </FeeProvider>
    </div>
  );
};

export default Home;
