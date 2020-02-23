import React, {useState, useRef} from "react";
import Message from "./message";
import MessageComposer from "./message-composer";
import "./styles/conversation.scss";
import {IHCAPIUser, IHCAPIMessage} from '@huskiesio/types'

const ENTER: number = 13;

export default ({className, header, tagline, onHeaderChange, onTaglineChange}: {className: string, header: string, tagline: string, onHeaderChange: Function, onTaglineChange: Function}): React.ReactElement<{}> => {
  const messageContainerRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const seed = [
    {
      senderId: '1',
      threadId: '1',
      payload: Buffer.from('**Bolded text**'),
      id: '1',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    }
  ]

  const [messages, setMessages]: [IHCAPIMessage[], Function] = useState(seed);

  const [isHeaderBeingEdited, editHeader] = useState(false);
  const [isTaglineBeingEdited, editTagline] = useState(false);

  const handleNewMessage: Function = (msg: string): void => {
	setMessages([...messages, {
    senderId: '1',
    threadId: '1',
    payload: Buffer.from(msg),
    id: '1',
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  }]);

  // Scroll to bottom
  if (messageContainerRef.current) {
	messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  }
  };

  const reducedMessages = messages.reduce((accum: ReducedMessage[], message: IHCAPIMessage) => {
	if (accum[accum.length - 1] && accum[accum.length - 1].senderId === message.senderId) {
		accum[accum.length - 1].messages.push(message);
	} else {
		accum.push({...message, messages: [message]});
	}

	return accum;
  }, []);

  return (
	<div className={`${className ? className : ""} conversation`}>
		<div className="header-container">
    {
      isHeaderBeingEdited ? (
        <input className="h1 inline" autoFocus defaultValue={header} onKeyDown={e => {
          if (e.keyCode === ENTER) {
            editHeader(false);
            onHeaderChange(e.currentTarget.value);
          }
        }}/>
      ) : (
        <h1 onClick={() => editHeader(true)}>{header}</h1>
      )
    }

    {
      isTaglineBeingEdited ? (
        <input className="h3 inline" autoFocus defaultValue={tagline} onKeyDown={e => {
          if (e.keyCode === ENTER) {
            editTagline(false);
            onTaglineChange(e.currentTarget.value);
          }
        }}/>
      ) : (
        <h3 className="weight-normal" onClick={() => editTagline(true)}>{tagline}</h3>
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
