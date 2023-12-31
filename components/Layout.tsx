"use client";

import Header from "./Header";
import Head from "next/head";
import Providers from "./Providers";

import { LayoutProps } from "@/utils/interfaces-types";

/**
 * Render the Layout component.
 *
 * @param {LayoutProps} children - The children to be rendered inside the Layout component.
 * @return {JSX.Element} The rendered Layout component.
 */
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Providers>
        <Head>
          <title>Linkster Dashboard</title>
          <meta content="Dashboard for Event Organizers & Users" name="description" />
          <link href="/favicon.ico" rel="icon" />
        </Head>
        {children}
      </Providers>
    </>
  );
};

export default Layout;
