import React from "react";
import UserPanel from "./UserPanel";
import Favorited from "./Favorited";
import DirectMassages from "./DirectMassages";
import ChatRooms from "./ChatRooms";

function Sidepanel() {
  return (
    <div
      style={{
        backgroundColor: "#7B83EB",
        padding: "2rem",
        minHeight: "100vh",
        color: "white",
        minWidth: "275px",
      }}
    >
      <UserPanel />
      <Favorited />
      <ChatRooms />
      <DirectMassages />
    </div>
  );
}

export default Sidepanel;
