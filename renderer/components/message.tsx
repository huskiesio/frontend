import React from "react";
import MessageRenderer from "@huskiesio/message-renderer";

export default ({message}: {message: string}): React.ReactElement<{}> => {
  return <MessageRenderer text={message}/>;
};
