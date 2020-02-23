import React from "react";
import {useGlobal} from "reactn";
import Head from "next/head";
import UsersSidebar from "../components/users-sidebar";
import Conversation from "../components/conversation";
import {sendMessage} from "../utils/messages";
import { IHCBotMessage } from "@huskiesio/bot/dts/types";
import "./styles/home.scss";

const Home: React.ComponentType = (): React.ReactElement<{}> => {
  const [currentThread] = useGlobal("currentThread");
  const [threads, setThreads] = useGlobal("threads");
  const [currentUser] = useGlobal("currentUser");

  const thisThread = threads.find(t => t.id === currentThread);

  const handleNewMessage = async (msg: any) => {
    await sendMessage(msg);

    const savedMsg = {
      sender: () => currentUser,
      payload: () => msg.message,
      timestamp: () => new Date().getTime()
    }

	thisThread.messages.push(savedMsg);

	setThreads([...threads.filter(t => t.id !== currentThread), thisThread])
  };

  return (
	<React.Fragment>
		<Head>
		  <title>HuskyChat</title>
		</Head>
		<div className="home">
		  <UsersSidebar className="users-sidebar"/>
		  <Conversation className="conversation" thread={thisThread} onNewMessage={handleNewMessage} onHeaderChange={console.log} onTaglineChange={console.log}/>
		</div>
	</React.Fragment>
  );
};

export default Home;
