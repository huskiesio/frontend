import React, {useState, useRef} from "react";
import Message from "./message";
import MessageComposer from "./message-composer";
import "./styles/conversation.scss";

export default ({className, header, tagline}: {className: string, header: string, tagline: string}): React.ReactElement<{}> => {
  const messageContainerRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const [messages, setMessages]: [Message[], Function] = useState([
	{
		message: "**Bolded text**",
		author: {
		name: "Max Isom",
		avatar: "https://s3.amazonaws.com/keybase_processed_uploads/d24c7479498157f2cb81e185977dfd05_360_360.jpeg"
		}
	}
  ]);

  const handleNewMessage: Function = (msg: string): void => {
	setMessages([...messages, {message: msg, author: {
	name: "Max",
	avatar: "https://s3.amazonaws.com/keybase_processed_uploads/d24c7479498157f2cb81e185977dfd05_360_360.jpeg"
  }}]);

  // Scroll to bottom
  if (messageContainerRef.current) {
	messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  }
  };

  return (
	<div className={`${className ? className : ""} conversation`}>
		<div className="header-container">
		<h1>{header}</h1>
		<h3>{tagline}</h3>
		</div>

		<div className="messages" ref={messageContainerRef}>
			{
				messages.map((m: Message): React.ReactElement<{}> => <Message key={m.message} message={m.message} author={m.author}/>)
			}
		</div>

		<MessageComposer className="message-composer" onMessage={handleNewMessage}/>
	</div>
  );
};
