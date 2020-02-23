import React, {useState, useEffect, useRef} from "react";
import Overlay from "./overlay";
import UserRow from "./user-row";
import "./styles/new-chat-overlay.scss";

export default ({className = "", opened = false, onClose, onNewChat}: {className?: string, opened?: boolean, onClose: Function, onNewChat: Function}): React.ReactElement<{}> => {
  const users = [
	{
  	name: "Max Isom",
  	avatar: "https://s3.amazonaws.com/keybase_processed_uploads/d24c7479498157f2cb81e185977dfd05_360_360.jpeg"
	}
  ];

  const [selectedUsers, setSelectedUsers]: [User[], Function] = useState([]);
  const [searchText, setSearchText]: [string, Function] = useState("");

  const toggleSelectedUser = (user: User) => {
	if (selectedUsers.some(u => u.name === user.name)) {
		setSelectedUsers(selectedUsers.filter(u => u.name !== user.name));
	} else {
		setSelectedUsers([...selectedUsers, user]);
	}
  };

  const UserList = ({searchText, filteredUsers, selectedUsers}: {searchText: string, filteredUsers: User[], selectedUsers: User[]}) => {
	let users = [];

	if (searchText === "") {
		// Show selected users
		if (selectedUsers.length === 0) {
		return (
			<h3>No users selected</h3>
		);
		} else {
		users = selectedUsers;
		}
	} else {
		// Show filtered users
		if (filteredUsers.length === 0) {
		return (
			<h3>No users found</h3>
		);
		} else {
		users = filteredUsers;
		}
	}

	return (
		<>
		{users.map(user => (
		<div key={user.name} className="user-details">
			<UserRow user={user} expanded/>
			<button className="blue" onClick={() => toggleSelectedUser(user)}>
			{
				selectedUsers.some(u => u.name === user.name) ? "Remove" : "Add"
			}
			</button>
		</div>
		))}
		</>
	);
  };

  return (
  <Overlay opened={opened} onClose={onClose}>
  	<div className={`new-chat-overlay ${className}`}>
  		<input autoFocus placeholder="Search directory..." value={searchText} onChange={e => setSearchText(e.target.value)}/>

		<div className="directory-results">
		<UserList searchText={searchText} filteredUsers={[]} selectedUsers={[]}/>
		</div>

		<button className="inverted" disabled={selectedUsers.length === 0} onClick={() => onNewChat(selectedUsers)}>Start chat</button>
  	</div>
  </Overlay>
  );
};
