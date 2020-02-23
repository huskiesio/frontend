import React, {useState} from "react";
import {useGlobal} from "reactn";
import UserRow from "./user-row";
import NewChatOverlay from "./new-chat-overlay";
import "./styles/users-sidebar.scss";

export default ({className = ""}: {className: string}): React.ReactElement<{}> => {
  const [overlayOpen, showOverlay] = useState(false);
  const [threads] = useGlobal("threads");
  const [currentThread, setCurrentThread] = useGlobal("currentThread");

  const handleThreadSwitch = (id: string) => {
	setCurrentThread(id);
  };

  return (
	<div className={`users-sidebar ${className}`}>
		{threads.map(thread => <UserRow className="chat-user-group" onClick={() => handleThreadSwitch(thread.id)} key={thread.id} user={thread.messages[0].sender()} highlighted={thread.id === currentThread}/>)}

	<NewChatOverlay opened={overlayOpen} onClose={() => showOverlay(false)} onNewChat={console.log}/>

	<button className="square inverted" onClick={() => showOverlay(true)}>+</button>
	</div>
  );
};
