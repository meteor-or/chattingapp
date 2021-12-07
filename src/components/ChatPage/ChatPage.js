import React from "react";
import Sidepanel from "./Sidepanel/Sidepanel";
import Mainpanel from "./Mainpanel/Mainpanel";
import { useSelector } from "react-redux";

function ChatPage() {
  const currentChatRoom = useSelector(
    (state) => state.chatRoom.currentChatRoom
  );
  return (
    <main style={{ display: "flex" }}>
      <aside style={{ width: "300px" }}>
        <Sidepanel />
      </aside>
      <section style={{ width: "100%" }}>
        <Mainpanel key={currentChatRoom && currentChatRoom.id} />
      </section>
    </main>
  );
}

export default ChatPage;
