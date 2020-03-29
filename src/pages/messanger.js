import React from "react";
import Chat from "../components/Chat/chat";

const messanger = props => {
  return (
    <div>
      <Chat {...props} />
    </div>
  );
};

export default messanger;
