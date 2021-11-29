import React from "react";
import Sidepanel from "./Sidepanel/Sidepanel";
import Mainpanel from "./Mainpanel/Mainpanel";

function ChatPage() {
  return (
    <main style={{ display: "flex" }}>
      <aside style={{ width: "300px" }}>
        <Sidepanel />
      </aside>
      <section style={{ width: "100%" }}>
        <Mainpanel />
      </section>
    </main>
  );
}

export default ChatPage;
