"use client";

import { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import type { NextPageWithLayout } from "@/pages/_app";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAccount } from "wagmi";


const Home: NextPageWithLayout = () => {
  const { address } = useAccount();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      // fetch data
      setIsLoading(false);
    };

    fetchData();
  }, [address]);

  return (
    <main className="container mx-auto">
      {isLoading && <LoadingSpinner />}
      This is the home
    </main>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
