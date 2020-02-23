import React, {useEffect} from "react";
import {setGlobal} from "reactn";
import {ipcRenderer} from "electron";
import {loadThreads} from "../utils/threads";
import "./styles/main.scss";
import { IHCBotMessage } from "@huskiesio/bot/dts/types";

loadThreads().then(threads => {
  setGlobal({
	threads,
	currentThread: threads[0].id,
	currentUserId: "1"
  });
});

export default ({ Component, pageProps }: {Component: React.ComponentType, pageProps: any}): React.ReactElement<{}> => {
  // Add event listeners on client
  useEffect(() => {
	ipcRenderer.on("new-message", (_, msg: IHCBotMessage) => {
		console.log(msg);
	});
  }, []);

  return (
	<div className="container">
		<Component {...pageProps} />
	</div>
  );
};
