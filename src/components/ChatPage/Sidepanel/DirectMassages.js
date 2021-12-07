import React, { Component } from "react";
import { FaPlus } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import { getDatabase, ref, onChildAdded } from "firebase/database";
import { connect } from "react-redux";
import {
  setCurrentChatRoom,
  setPrivateChatRoom,
} from "../../../redux/actions/chatRoom_action";
export class DirectMassages extends Component {
  //inistial
  state = {
    usersRef: ref(getDatabase(), "users"),
    users: [],
    activeChatRoom: "",
  };

  componentDidMount() {
    if (this.props.user) {
      this.addUserListners(this.props.user.uid);
    }
  }

  //유저 목록 가져오기
  addUserListners = (currentUserId) => {
    const { usersRef } = this.state;
    let usersArray = [];

    onChildAdded(usersRef, (DataSnapshot) => {
      if (currentUserId !== DataSnapshot.key) {
        let user = DataSnapshot.val();
        user["uid"] = DataSnapshot.key;
        user["status"] = "offline";
        usersArray.push(user);
        this.setState({ users: usersArray });
      }
    });
  };

  getChatRoomId = (userId) => {
    const currentUserId = this.props.user.uid;

    //나와 다른 사람의 채팅방 ID가 유니크해야함
    //그러기 위해서 나의 아이디와 상대방 아이디를 이용해서 방 아이디를 생성
    //userId < currentUserId 와 같은 로직을 이용해서 방 아이디 생성
    return userId > currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };

  changeChatRoom = (user) => {
    const chatRoomId = this.getChatRoomId(user.uid);
    const chatRoomData = {
      id: chatRoomId,
      name: user.name,
    };

    this.props.dispatch(setCurrentChatRoom(chatRoomData));
    this.props.dispatch(setPrivateChatRoom(true));
    this.setactiveChatRoom(user.uid);
  };

  setactiveChatRoom = (userId) => {
    this.setState({ activeChatRoom: userId });
  };

  renderDirectMessages = (users) =>
    users.length > 0 &&
    users.map((user) => (
      <li
        key={user.uid}
        style={{
          backgroundColor:
            user.uid === this.state.activeChatRoom && "#ffffff45",
        }}
        onClick={() => this.changeChatRoom(user)}
      >
        # {user.name}
      </li>
    ));

  render() {
    const { users } = this.state;
    return (
      <div>
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          DIRECT MASSAGES ({users.length})
          <button style={{ backgroundColor: "transparent" }}>
            <FaPlus
              onClick={this.handleShow}
              style={{
                color: "white",
              }}
            />
          </button>
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {this.renderDirectMessages(users)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(DirectMassages);
