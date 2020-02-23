import React from "react";
import MessageRenderer from "@huskiesio/message-renderer";
import Avatar from "./avatar";
import "./styles/message.scss";

const self = "Max Isom";

export default ({message, author}: {message: string, author: User}): React.ReactElement<{}> => {
  return (
	<div className={`message-container ${author.name === self ? "self" : ""}`}>
		{
		author.name === self ? <div/> : (
			<Avatar user={author}/>
		)
		}

		<div className="info-container">
		<div className="name">{author.name}</div>
		<MessageRenderer text={message} className="message"/>
		</div>

		{
		author.name === self ? (
			<Avatar user={author}/>
		) : (
			<div/>
		)
		}
	</div>
  );
};
