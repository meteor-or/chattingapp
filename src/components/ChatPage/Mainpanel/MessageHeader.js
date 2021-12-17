import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Image,
  Accordion,
} from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  child,
  update,
  remove,
  onValue,
} from "firebase/database";

function MassageHeader({ handleSearchChange }) {
  const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom);
  const isPrivateChatRoom = useSelector(
    (state) => state.chatRoom.isPrivateChatRoom
  );
  const user = useSelector((state) => state.user.currentUser);
  const [isFavorited, setIsFavorited] = useState(false);
  const usersRef = ref(getDatabase(), "users");

  useEffect(() => {
    if (chatRoom && user) {
      addFavoriteListener(chatRoom.id, user.uid);
    }
  }, []);

  const addFavoriteListener = (chatRoomId, userId) => {
    onValue(child(usersRef, `${userId}/favorited`), (data) => {
      if (data.val() !== null) {
        const chatRoomIds = Object.keys(data.val());
        const isAlreadyFavorited = chatRoomIds.includes(chatRoomId);
        setIsFavorited(isAlreadyFavorited);
      }
    });
  };

  const handleFavorite = () => {
    if (isFavorited) {
      setIsFavorited((prev) => !prev);
      remove(child(usersRef, `${user.uid}/favorited/${chatRoom.id}`));
    } else {
      setIsFavorited((prev) => !prev);
      update(child(usersRef, `${user.uid}/favorited`), {
        [chatRoom.id]: {
          name: chatRoom.name,
          description: chatRoom.description,
          createdBy: {
            name: chatRoom.createdBy.name,
            image: chatRoom.createdBy.image,
          },
        },
      });
    }
  };

  return (
    <header
      style={{
        width: "100%",
        height: "170px",
        border: ".1rem solid #ececec",
        borderRadius: "4px",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <Container>
        <Row>
          <Col>
            <h2>
              {isPrivateChatRoom ? (
                <FaLock style={{ marginBottom: "10px" }} />
              ) : (
                <FaLockOpen style={{ marginBottom: "10px" }} />
              )}
              {chatRoom && chatRoom.name}

              {!isPrivateChatRoom && (
                <span style={{ cursor: "pointer" }} onClick={handleFavorite}>
                  {isFavorited ? (
                    <MdFavorite style={{ marginBottom: "10px" }} />
                  ) : (
                    <MdFavoriteBorder style={{ marginBottom: "10px" }} />
                  )}
                </span>
              )}
            </h2>
          </Col>
          <Col>
            {" "}
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <AiOutlineSearch />
              </InputGroup.Text>

              <FormControl
                onChange={handleSearchChange}
                placeholder="메세지 검색하기"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row style={{ justifyContent: "flex-end" }}>
          <Image scr="" /> user name
        </Row>
        <Row>
          <Col>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col>
            <Accordion>
              <Accordion.Item eventKey="1">
                <Accordion.Header></Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default MassageHeader;
