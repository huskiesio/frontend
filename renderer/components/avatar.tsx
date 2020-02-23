import React from "react";
import "./styles/avatar.scss";

export default ({user, className = ""}: {user: User, className?: string}) => {
  return (
	<div className={className}>
		{
		user.avatar ? (
			<div className="avatar-container">
			<img src={user.avatar}/>
			</div>
		) : (
			<div className="default-avatar">
			<span>{user.name.split(" ").reduce((accum, n) => {
			accum += n[0];
			return accum;
			}, "")}</span>
			</div>
		)
		}
	</div>
  );
};
