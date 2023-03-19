import { FeeProvider } from "contexts/FeeContext";
import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  console.log("azoth zephyr lives forever")
  return (
    <div>
      <Head>
        <title>Bitcoin Gumball Machine</title>
        <meta
          name="description"
          content="Bitcoin Gumball Machine"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
