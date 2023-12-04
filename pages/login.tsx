import Layout from "@/components/Layout";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

const Login: NextPageWithLayout = () => {
  const router = useRouter();

  const { isConnected, address } = useAccount({
    onConnect: async ({ address, connector }) => router.push("/"),
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <ConnectButton />
    </div>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Login;
