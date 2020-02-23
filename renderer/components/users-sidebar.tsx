import React, {useState} from "react";
import UserRow from "./user-row";
import NewChatOverlay from "./new-chat-overlay";
import "./styles/users-sidebar.scss";
import {getUserById} from '../utils/user';

export default ({className = ""}: {className: string}): React.ReactElement<{}> => {
  const [overlayOpen, showOverlay] = useState(false);

  const users = [getUserById('1')];

  return (
	<div className={`users-sidebar ${className}`}>
		{users.map(user => <UserRow key={user.id} id={user.id} highlighted/>)}

	<NewChatOverlay opened={overlayOpen} onClose={() => showOverlay(false)} onNewChat={console.log}/>

	<button className="square inverted" onClick={() => showOverlay(true)}>+</button>
	</div>
  );
};
