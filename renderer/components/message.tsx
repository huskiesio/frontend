import React from "react";
import MessageRenderer from "@huskiesio/message-renderer";
import Avatar from "./avatar";
import "./styles/message.scss";
import {getUserById} from '../utils/user';

const self = "1";

export default ({message}: {message: ReducedMessage}): React.ReactElement<{}> => {
  return (
	<div className={`message-container ${message.senderId === self ? "self" : ""}`}>
		{
		message.senderId === self ? <div/> : (
			<Avatar id={message.senderId}/>
		)
		}

		<div className="info-container">
		<div className="name">{`${getUserById(message.senderId).firstName} ${getUserById(message.senderId).lastName}`}</div>

	<div className="messages-list">
		{
		message.messages.map(m => <div>
      <MessageRenderer text={m.payload.toString()} className="message"/>
      <div className="timestamp">{new Date(m.updatedAt).toLocaleString()}</div>
    </div>)
		}
	</div>
		</div>

		{
		message.senderId === self ? (
			<Avatar id={message.senderId}/>
		) : (
			<div/>
		)
		}
	</div>
  );
};
