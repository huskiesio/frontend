import React from "react";
import "./styles/main.scss";

export default ({ Component, pageProps }: {Component: React.ComponentType, pageProps: any}): React.ReactElement<{}> => {
  return <Component {...pageProps} />;
};
