import React from "react";
import * as Store from "electron-store";
import "./styles/main.scss";

export default ({ Component, pageProps }: {Component: React.ComponentType, pageProps: any}): React.ReactElement<{}> => {
  return (
	<div className="container">
		<Component {...pageProps} />
	</div>
  );
};
