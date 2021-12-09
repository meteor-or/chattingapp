import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import moment from "moment";

function Message({ message, user }) {
  const timeFromNow = (timestamp) => moment(timestamp).fromNow();

  const isImage = (message) => {
    return (
      message.hasOwnProperty("image") && !message.hasOwnProperty("content")
    );
  };
  const isMessageMine = (message, user) => {
    if (user) {
      return message.user.id === user.uid;
    }
  };

  return (
    <Container>
      <Row style={{ width: "100%" }}>
        <Col sm={1}>
          {" "}
          <Image
            width={48}
            height={48}
            src={message.user.image}
            alt={message.user.name}
            roundedCircle
          />
        </Col>
        <Col
          style={{
            backgroundColor: isMessageMine(message, user) && "#ECECEC",
          }}
          sm={8}
        >
          <h6>
            {message.user.name}
            <span
              style={{ marginLeft: "4px", fontSize: "10px", color: "gray" }}
            >
              {timeFromNow(message.timestamp)}
            </span>
          </h6>

          {/* 분기처리 */}
          {isImage(message) ? (
            <img
              style={{ maxWidth: "300px" }}
              alt="이미지"
              src={message.image}
            />
          ) : (
            <p>{message.content}</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Message;
