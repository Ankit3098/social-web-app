import React from "react";
import { Link } from "react-router-dom";
import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";

import "./InfoBar.css";

const InfoBar = ({ group }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{group}</h3>
    </div>
    <div className="rightInnerContainer">
      <Link to="/">
        <img src={closeIcon} alt="close icon" />
      </Link>
    </div>
  </div>
);

export default InfoBar;
