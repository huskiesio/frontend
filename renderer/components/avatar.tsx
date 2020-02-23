import React from "react";
import "./styles/avatar.scss";
import {getAvatarById} from '../utils/user'

export default ({id, className = ""}: {id: string, className?: string}) => {
  // TODO: lookup by id
  const image = getAvatarById(id);

  return (
	<div className={className}>
    <div className="avatar-container">
			<img src={`data:image/jpeg;base64,${image ? image.toString('base64') : ''}`}/>
		</div>
	</div>
  );
};
