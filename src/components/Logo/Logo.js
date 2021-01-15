import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import logoImage from "./logo.png";

const Logo = () => {
  return (
    <Tilt
      className="Tilt br2 shadow-2 ma4 mt0"
      options={{ max: 60 }}
      style={{ height: 150, width: 150 }}
    >
      <div className="Tilt-inner pa3">
        <img alt="logo" src={logoImage} />
      </div>
    </Tilt>
  );
}

export default Logo;