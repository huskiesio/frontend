import React, {useState} from "react";
import Message from "./message";
import MessageComposer from "./message-composer";

interface Message {
  message: string;
}

export default (): React.ReactElement<{}> => {
  const [messages, setMessages]: [Message[], Function] = useState([]);

  const handleNewMessage: Function = (msg: string): void => {
	setMessages([...messages, {message: msg}]);
  };

  return (<>
	{
		messages.map((m: Message): React.ReactElement<{}> => <Message key={m.message} message={m.message}/>)
	}

	<MessageComposer onMessage={handleNewMessage}/>
  </>);
};
