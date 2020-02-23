import React, {useEffect} from "react";
import {useGlobal} from "reactn";
import Head from "next/head";
import UsersSidebar from "../components/users-sidebar";
import Conversation from "../components/conversation";
import {sendMessage} from "../utils/messages";
import { IHCBotMessage } from "@huskiesio/bot/dts/types";
import {getUserById} from '../utils/user';
import "./styles/home.scss";

const Home: React.ComponentType = (): React.ReactElement<{}> => {
  const [currentThread] = useGlobal("currentThread");
  const [threads, setThreads] = useGlobal("threads");

  const thisThread = threads.find(t => t.id === currentThread);

  const handleNewMessage = async (msg: any) => {
    // For testing. Should be stripped out and replaced with res.
    msg.sender = () => getUserById('1');
    msg.payload = () => msg.message
    msg.timestamp = () => new Date().getTime()
	// const res = await sendMessage(msg);
  //
	// console.log(res);

	thisThread.messages.push(msg);

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
