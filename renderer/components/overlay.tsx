import React, {useEffect, useState, useRef} from "react";
import "./styles/overlay.scss";

export default ({children, opened, onClose}: {children: React.ReactNode, opened: boolean, onClose: Function}) => {
  const overlayRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [isOpened, setOpened] = useState(true);

  const closeOverlay = (e: MouseEvent) => {
	if (overlayRef.current && overlayRef.current.contains(e.target as Node)) {
		return;
	}

	document.removeEventListener("mousedown", closeOverlay);

	if (!opened) {
		return;
	}

	setOpened(false);
	onClose();
  };

	useEffect(() => {
		if (opened) {
		document.addEventListener("mousedown", closeOverlay);
		setOpened(true);

		return () => {
		document.removeEventListener("mousedown", closeOverlay);
		};
	}
	});

  return (
	<div ref={overlayRef} className={`overlay ${(opened && isOpened) ? "opened" : ""}`}>
		<div className="overlay-content">
		{children}
		</div>
	</div>
  );
};
