import React, {useEffect} from "react";
import {useRouter} from 'next/router'
import {setGlobal} from "reactn";
import {ipcRenderer} from "electron";
import {loadThreads} from "../utils/threads";
import "./styles/main.scss";
import { IHCBotMessage } from "@huskiesio/bot/dts/types";

loadThreads().then(threads => {
  setGlobal({
	threads,
	currentThread: threads[0].id,
  currentUser: {
    id: 'fake'
  }
  });
});

export default ({ Component, pageProps }: {Component: React.ComponentType, pageProps: any}): React.ReactElement<{}> => {
  const router = useRouter();

  useEffect(() => {
    // Add event listeners on client
	ipcRenderer.on("new-message", (_, msg: IHCBotMessage) => {
		console.log(msg);
	});

  // Redirect to sign in if necessary
  ipcRenderer.invoke("is-signed-in").then(signedIn => {
    if (!signedIn) {
      router.push('/signin')
    } else {
      ipcRenderer.invoke("get-user-info").then(userInfo => {
        setGlobal({currentUser: userInfo})
      })
    }
  });
  }, []);

  return (
	<div className="container">
		<Component {...pageProps} />
	</div>
  );
};
