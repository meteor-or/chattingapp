import React, { useState } from "react";
import { Form, ProgressBar, Row, Col } from "react-bootstrap";
import firebase from "../../../firebase";
import { useSelector } from "react-redux";
import { getDatabase, ref, set, remove, push, child } from "firebase/database";

function MasseageForm() {
  const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom);
  const user = useSelector((state) => state.user.currentUser);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState("");
  const messagesRef = ref(getDatabase(), "messages");

  const createMessage = (fileUrl = null) => {
    const message = {
      timestamp: new Date(),
      user: {
        id: user.uid,
        name: user.displayName,
        image: user.photoURL,
      },
    };
    // 파일이 있으면 이미지를 보내고 파일이 없으면 컨텐츠를 보내기
    if (fileUrl !== null) {
      message["image"] = fileUrl;
    } else {
      message["content"] = content;
    }

    return message;
  };
  //키보드를 입력할 때마다 컨텐츠를 바꿔준다.
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    if (!content) {
      setErrors((prev) => prev.concat("Type contents first"));
      return;
    }
    setLoading(true);
    //firebase에 메시지를 저장하는 부분
    try {
      await set(push(child(messagesRef, chatRoom.id)), createMessage());
      setLoading(false);
      setContent("");
      setErrors([]);
    } catch (error) {
      setErrors((pre) => pre.concat(error.message));
      setLoading(false);
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            value={content}
            onChange={handleChange}
            as="textarea"
            rows={3}
          />
        </Form.Group>
      </Form>

      <ProgressBar variant="warning" label="60%" now={60} />
      <div>
        {errors.map((errorMsg) => (
          <p style={{ color: "red" }} key={errorMsg}>
            {errorMsg}
          </p>
        ))}
      </div>

      <Row>
        <Col>
          <button
            onClick={handleSubmit}
            className="message_form_btn"
            style={{ width: "100%" }}
          >
            SEND
          </button>
        </Col>
        <Col>
          <button className="message_form_btn" style={{ width: "100%" }}>
            upload
          </button>
        </Col>
      </Row>
    </div>
  );
}

export default MasseageForm;
