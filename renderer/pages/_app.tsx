import React from "react";
import * as Store from "electron-store";
import {setGlobal} from 'reactn';
import {loadThreads} from '../utils/threads';
import "./styles/main.scss";

loadThreads().then(threads => {
  setGlobal({
    threads,
    currentThread: '1',
    currentUserId: '1'
  });
})

export default ({ Component, pageProps }: {Component: React.ComponentType, pageProps: any}): React.ReactElement<{}> => {
  return (
	<div className="container">
		<Component {...pageProps} />
	</div>
  );
};
