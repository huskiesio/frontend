import React, {useState} from "react";

const SHIFT: number = 16;
const ENTER: number = 13;

export default ({onMessage}: {onMessage: Function}): React.ReactElement<{}> => {
  const [message, setMessage]: [string, Function] = useState("");
  const [shiftHeld, setShiftHeld]: [boolean, Function] = useState(false);

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
	const {keyCode}: {keyCode: number} = e;

	if (keyCode === SHIFT) {
		setShiftHeld(true);
	}

	if (keyCode === ENTER) {
		if (!shiftHeld) {
		e.preventDefault();

	if (message !== "") {
		onMessage(message);
	}

		setMessage("");
		}
	}
  };

  const handleKeyUp: React.KeyboardEventHandler<HTMLTextAreaElement> = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
	const {keyCode}: {keyCode: number} = e;

	if (keyCode === SHIFT) {
		setShiftHeld(false);
	}
  };

  return (
	<>
		<textarea value={message} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => setMessage(e.target.value)} placeholder="Start typing..."/>
	</>
  );
};
