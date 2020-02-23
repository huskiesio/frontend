import React, {useEffect} from "react";
import {useGlobal} from 'reactn';
import Head from "next/head";
import UsersSidebar from "../components/users-sidebar";
import Conversation from "../components/conversation";
import {sendMessage} from '../utils/messages';
import "./styles/home.scss";
import { UnsavedMessage } from "../types";

const Home: React.ComponentType = (): React.ReactElement<{}> => {
  const [currentThread] = useGlobal('currentThread');
  const [threads, setThreads] = useGlobal('threads');

  const thisThread = threads.find(t => t.id === currentThread);

  const handleNewMessage = (msg: UnsavedMessage) => {
    sendMessage(msg);

    thisThread.messages.push(msg);

    setThreads([...threads.filter(t => t.id !== currentThread), thisThread])
  }

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
