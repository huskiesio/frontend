import React from "react";
import Avatar from "./avatar";
import "./styles/user-row.scss";
import {getUserById} from '../utils/user';

export default ({className = "", id, expanded = false, highlighted = false, onClick}: {className?: string, id: string, expanded?: boolean, highlighted?: boolean, onClick?: Function}): React.ReactElement<{}> => {
  return (
	<div onClick={e => onClick ? onClick(e) : ''} className={`user-row ${className} ${expanded ? "expanded" : ""} ${highlighted ? "highlighted" : ""}`}>
		<Avatar className="avatar" id={id}/>

		<div className="name">
		  {getUserById(id).username}
		</div>
	</div>
  );
};
