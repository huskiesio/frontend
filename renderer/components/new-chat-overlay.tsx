import React, {useState, useEffect, useRef} from "react";
import Overlay from "./overlay";
import UserRow from "./user-row";
import "./styles/new-chat-overlay.scss";
import { IHCBotUser } from "@huskiesio/bot/dts/types";
import {searchForUsers} from "../utils/user";

export default ({className = "", opened = false, onClose, onNewChat}: {className?: string, opened?: boolean, onClose: Function, onNewChat: Function}): React.ReactElement<{}> => {
  const [selectedUsers, setSelectedUsers]: [IHCBotUser[], Function] = useState([]);
  const [filteredUsers, setFilteredUsers]: [IHCBotUser[], Function] = useState([]);
  const [searchText, setSearchText]: [string, Function] = useState("");

  const toggleSelectedUser = (user: IHCBotUser) => {
	if (selectedUsers.some(u => u.id === user.id)) {
		setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
	} else {
		setSelectedUsers([...selectedUsers, user]);
	}
  };

  // User list component
  const UserList = ({searchText, filteredUsers, selectedUsers}: {searchText: string, filteredUsers: IHCBotUser[], selectedUsers: IHCBotUser[]}) => {
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
		<div key={user.id} className="user-details">
			<UserRow user={user} expanded/>
			<button className="blue" onClick={() => toggleSelectedUser(user)}>
			{
				selectedUsers.some(u => u.id === user.id) ? "Remove" : "Add"
			}
			</button>
		</div>
		))}
		</>
	);
  };

  useEffect(() => {
	const asyncUpdate = async () => {
		const users = await searchForUsers(searchText);

		setFilteredUsers(users);
	};

	asyncUpdate();
  }, [searchText]);

  return (
  <Overlay opened={opened} onClose={onClose}>
  	<div className={`new-chat-overlay ${className}`}>
  		<input autoFocus placeholder="Search directory..." value={searchText} onChange={e => setSearchText(e.target.value)}/>

		<div className="directory-results">
		<UserList searchText={searchText} filteredUsers={filteredUsers} selectedUsers={selectedUsers}/>
		</div>

		<button className="inverted" disabled={selectedUsers.length === 0} onClick={() => onNewChat(selectedUsers)}>Start chat</button>
  	</div>
  </Overlay>
  );
};
