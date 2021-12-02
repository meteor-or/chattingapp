import React, { Component } from "react";
import MessageHeader from "./MessageHeader";
import Message from "./Message";
import MesseageForm from "./MesseageForm";
import { connect } from "react-redux";
import {
  getDatabase,
  ref,
  onChildAdded,
  onChildRemoved,
  child,
  off,
} from "firebase/database";

export class Mainpanel extends Component {
  state = {
    messages: [],
    messagesRef: ref(getDatabase(), "messages"),
    messagesLoading: true,
  };

  componentDidMount() {
    const { chatRoom } = this.props;

    if (chatRoom) {
      this.addMessagesListeners(chatRoom.id);
    }
  }
  addMessagesListeners = (chatRoomId) => {
    let messagesArray = [];
    let { messagesRef } = this.state;

    this.state.messagesRef
      .child(chatRoomId)
      .on("child_added", (DataSnapshot) => {
        messagesArray.push(DataSnapshot.val());
        this.setState({ messages: messagesArray, messagesLoading: false });
      });
  };

  renderMessages = (messages) =>
    messages.length > 0 &&
    //컴포넌트 하나를 더 추가함 message
    messages.map((message) => (
      <Message
        key={messages.timestamp}
        messages={message}
        user={this.props.user}
      />
    ));

  render() {
    const { messages } = this.state;
    return (
      <div style={{ padding: "2rem 2rem 0 2rem" }}>
        <MessageHeader />
        <div
          style={{
            width: "100%",
            height: "450px",
            border: ".15rem solid #ececec",
            borderRadius: "4px",
            padding: "1rem",
            marginBottom: "1rem",
            overflow: "auto",
          }}
        >
          {this.renderMessages(messages)}
        </div>
        <MesseageForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currntUser,
    chatRoom: state.chatRoom.currentChatRoom,
  };
};

export default connect(mapStateToProps)(Mainpanel);
