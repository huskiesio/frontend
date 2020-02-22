import React from "react";
import Head from "next/head";
import Link from "next/link";
import UsersSidebar from "../components/users-sidebar";
import Conversation from "../components/conversation";

const Home: React.ComponentType = (): React.ReactElement<{}> => {
  return (
	<React.Fragment>
		<Head>
		  <title>HuskyChat</title>
		</Head>
		<div>
		  <UsersSidebar/>
		<Conversation/>
		</div>
	</React.Fragment>
  );
};

export default Home;
