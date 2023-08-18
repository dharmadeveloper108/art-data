import React from "react";
import { AppInitialProps } from "next/app";
import { AuthContextProvider } from "@/app/auth/AuthContext";
import RootLayout from "@/app/layout";

type MyAppProps = AppInitialProps & {
  Component: React.ComponentType;
};

const MyApp: React.FC<MyAppProps> = (props) => {
  const { Component, pageProps } = props;

  return (
    <RootLayout>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </RootLayout>
  );
};
export default MyApp;
