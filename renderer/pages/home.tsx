import React, {useEffect} from "react";
import Head from "next/head";
import UsersSidebar from "../components/users-sidebar";
import Conversation from "../components/conversation";

import "./styles/home.scss";

const Home: React.ComponentType = (): React.ReactElement<{}> => {
  return (
	<React.Fragment>
		<Head>
		  <title>HuskyChat</title>
		</Head>
		<div className="home">
		  <UsersSidebar className="users-sidebar"/>
		  <Conversation className="conversation" header="A sample conversation" tagline="Hey that's pretty neat" onHeaderChange={console.log} onTaglineChange={console.log}/>
		</div>
	</React.Fragment>
  );
};

export default Home;
