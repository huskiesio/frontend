import React, {useState} from "react";
import UserRow from "./user-row";
import NewChatOverlay from "./new-chat-overlay";
import "./styles/users-sidebar.scss";

const users = [
  {
	name: "Max Isom",
	avatar: "https://s3.amazonaws.com/keybase_processed_uploads/d24c7479498157f2cb81e185977dfd05_360_360.jpeg"
  }
];

export default ({className = ""}: {className: string}): React.ReactElement<{}> => {
  const [hovering, setHovering] = useState(false);
  const [overlayOpen, showOverlay] = useState(false);

  return (
	<div className={`users-sidebar ${className} ${hovering ? "hovering" : ""}`} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
		{users.map(user => <UserRow key={user.name} user={user} highlighted expanded={hovering}/>)}

	<NewChatOverlay opened={true} onClose={() => showOverlay(false)} onNewChat={console.log}/>

	<button onClick={() => showOverlay(true)}>Add</button>
	</div>
  );
};
