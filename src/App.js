import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import ChatPage from "./components/ChatPage/ChatPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";

import firebase from "./firebase";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/actions/user_action";

function App(props) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("user", user);
      //로그인이 된 상태
      if (user) {
        navigate("/");
        dispatch(setUser(user));
      } else {
        navigate("/login");
      }
    });
  }, []);

  if (isLoading) {
    return <div>...loading</div>;
  } else {
    return (
      <Routes>
        <Route path="/" exact={true} element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    );
  }
}

export default App;
