import React, {useState, useRef} from "react";
import {useGlobal} from 'reactn';
import Message from "./message";
import MessageComposer from "./message-composer";
import "./styles/conversation.scss";
import {IHCAPIUser, IHCAPIMessage} from '@huskiesio/types'
import { StuffedThread, ReducedMessage } from "../types";

const ENTER: number = 13;

export default ({className, thread, onHeaderChange, onTaglineChange, onNewMessage}: {className: string, thread: StuffedThread, onHeaderChange: Function, onTaglineChange: Function, onNewMessage: Function}): React.ReactElement<{}> => {
  const messageContainerRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const userId = useGlobal('currentUserId')[0];
  const threadId = useGlobal('currentThread')[0];

  const [isHeaderBeingEdited, editHeader] = useState(false);
  const [isTaglineBeingEdited, editTagline] = useState(false);

  const handleNewMessage: Function = (msg: string): void => {
    onNewMessage({
      payload: Buffer.from(msg),
      senderId: userId,
      threadId
    })

  // Scroll to bottom
  if (messageContainerRef.current) {
	messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  }
  };

  const reducedMessages = thread.messages.reduce((accum: ReducedMessage[], message: IHCAPIMessage) => {
	if (accum[accum.length - 1] && accum[accum.length - 1].senderId === message.senderId) {
		accum[accum.length - 1].messages.push(message);
	} else {
		accum.push({...message, messages: [message]});
	}

	return accum;
  }, []);

  console.log(reducedMessages)

  return (
	<div className={`${className ? className : ""} conversation`}>
		<div className="header-container">
    {
      isHeaderBeingEdited ? (
        <input className="h1 inline" autoFocus defaultValue={thread.name} onKeyDown={e => {
          if (e.keyCode === ENTER) {
            editHeader(false);
            onHeaderChange(e.currentTarget.value);
          }
        }}/>
      ) : (
        <h1 onClick={() => editHeader(true)}>{thread.name}</h1>
      )
    }

    {
      isTaglineBeingEdited ? (
        <input className="h3 inline" autoFocus defaultValue={thread.description} onKeyDown={e => {
          if (e.keyCode === ENTER) {
            editTagline(false);
            onTaglineChange(e.currentTarget.value);
          }
        }}/>
      ) : (
        <h3 className="weight-normal" onClick={() => editTagline(true)}>{thread.description}</h3>
      )
    }
		</div>

		<div className="messages" ref={messageContainerRef}>
			{
				reducedMessages.map((m: ReducedMessage): React.ReactElement<{}> => <Message key={JSON.stringify(m.messages)} message={m}/>)
			}
		</div>

		<MessageComposer className="message-composer" onMessage={handleNewMessage}/>
	</div>
  );
};
