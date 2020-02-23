import React from "react";
import Avatar from "./avatar";
import "./styles/user-row.scss";

export default ({className = "", user, expanded = false, highlighted = false}: {className?: string, user: User, expanded?: boolean, highlighted?: boolean}): React.ReactElement<{}> => {
  return (
	<div className={`user-row ${className} ${expanded ? "expanded" : ""} ${highlighted ? "highlighted" : ""}`}>
		<Avatar className="avatar" user={user}/>

		<div className="name">
		{user.name}
		</div>
	</div>
  );
};
