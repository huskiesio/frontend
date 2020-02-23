import React from "react";
import Avatar from "./avatar";
import "./styles/user-row.scss";
import {getUserById} from '../utils/user';

export default ({className = "", id, expanded = false, highlighted = false}: {className?: string, id: string, expanded?: boolean, highlighted?: boolean}): React.ReactElement<{}> => {
  return (
	<div className={`user-row ${className} ${expanded ? "expanded" : ""} ${highlighted ? "highlighted" : ""}`}>
		<Avatar className="avatar" id={id}/>

		<div className="name">
		  {getUserById(id).username}
		</div>
	</div>
  );
};
