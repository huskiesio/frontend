import React from "react";
import MessageRenderer from "@huskiesio/message-renderer";
import Avatar from "./avatar";
import "./styles/message.scss";
import { ReducedMessage } from "../types";
import { IHCBotMessage } from "@huskiesio/bot/dts/types";

const self = "1";

export default ({message}: {message: ReducedMessage}): React.ReactElement<{}> => {
  const isSelfMessage = (msg: ReducedMessage) => msg.sender().id === self;

  return (
	<div className={`message-container ${isSelfMessage(message) ? "self" : ""}`}>
		{
		isSelfMessage(message) ? <div/> : (
			<Avatar id={message.sender().id}/>
		)
		}

		<div className="info-container">
		<div className="name">{`${message.sender().firstName()} ${message.sender().lastName()}`}</div>

	<div className="messages-list">
		{
		message.messages.map(m => <div>
		<MessageRenderer text={m.payload()} className="message"/>
		<div className="timestamp">{new Date(m.timestamp()).toLocaleString()}</div>
	</div>)
		}
	</div>
		</div>

		{
		isSelfMessage(message) ? (
			<Avatar id={message.sender().id}/>
		) : (
			<div/>
		)
		}
	</div>
  );
};
