import React from "react";
import Avatar from "./avatar";
import "./styles/user-row.scss";
import { IHCBotUser } from "@huskiesio/bot/dts/types";

export default ({className = "", user, expanded = false, highlighted = false, onClick}: {className?: string, user: IHCBotUser, expanded?: boolean, highlighted?: boolean, onClick?: Function}): React.ReactElement<{}> => {
  return (
	<div onClick={e => onClick ? onClick(e) : ""} className={`user-row ${className} ${expanded ? "expanded" : ""} ${highlighted ? "highlighted" : ""}`}>
		<Avatar className="avatar" id={user.id}/>

		<div className="name">
		  {`${user.firstName()} ${user.lastName()}`}
		</div>
	</div>
  );
};
