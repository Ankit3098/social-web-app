import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import Profile from "../profile/Profile";
import "./chat.css";
// mui stuff
import Grid from "@material-ui/core/Grid";

let socket;
const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://react-groupchat-app.herokuapp.com/";

  // use https://react-groupchat-app.herokuapp.com/ or localhost:5000

  useEffect(() => {
    const { name, group } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setGroup(group);
    setName(name);

    socket.emit("join", { name, group }, error => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  return (
    <Grid container spacing={2} className="outerContainer">
      <Grid item sm={8} xs={12} className="chatContainer">
        <InfoBar group={group} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </Grid>
      <Grid item sm={4} xs={12} className="profileContainer">
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Chat;
