import React, {useState, useRef, useEffect} from "react";
import "./styles/message-composer.scss";

const SHIFT: number = 16;
const ENTER: number = 13;

export default ({onMessage, className}: {onMessage: Function, className: string}): React.ReactElement<{}> => {
  const inputRef: React.RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(null);

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

  // Focus textarea on load
  useEffect(() => {
	if (inputRef.current) {
		inputRef.current.focus();
	}

  }, []);

  const onInput: React.FormEventHandler<HTMLTextAreaElement> = (e: any) => {
    setMessage(e.currentTarget.value);
  }

  useEffect(() => {
    let extraPadding = 0;

    if (message.split('\n').length >= 2) {
      extraPadding = 1;
    }

    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `calc(${inputRef.current.scrollHeight}px - 3.2rem + ${extraPadding}rem)`;
    }
  }, [message])

  return (
	<div className={`${className ? className : ""} message-composer`}>
		<textarea ref={inputRef} value={message} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} onChange={onInput} placeholder="Start typing..."/>
	</div>
  );
};
