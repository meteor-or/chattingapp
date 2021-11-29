import React, { useRef } from "react";
import { AiFillWechat } from "react-icons/ai";
import { Dropdown, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../../firebase";
import mime from "mime-types";
import { setPhotoURL } from "../../../redux/actions/user_action";
import { getDatabase, ref, child, update } from "firebase/database";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref as strRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

function UserPanel() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const inputOpenImageRef = useRef();

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut();
  };

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const auth = getAuth();
    const user = auth.currentUser;

    const metadata = { contentType: mime.lookup(file.name) };
    const storage = getStorage();
    // https://firebase.google.com/docs/storage/web/upload-files#full_example
    try {
      //스토리지에 파일 저장하기
      let uploadTask = uploadBytesResumable(
        strRef(storage, `user_image/${user.uid}`),
        file,
        metadata
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // 프로필 이미지 수정
            updateProfile(user, {
              photoURL: downloadURL,
            });

            dispatch(setPhotoURL(downloadURL));

            //데이터베이스 유저 이미지 수정
            update(ref(getDatabase(), `users/${user.uid}`), {
              image: downloadURL,
            });
          });
        }
      );
      // console.log('uploadTaskSnapshot', uploadTaskSnapshot)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* logo */}
      <h3 style={{ color: "white" }}>
        <AiFillWechat />
        Chat App
      </h3>

      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <Image
          src={user && user.photoURL}
          style={{ width: "30px", height: "30px", marginTop: "3px" }}
          roundedCircle
        />

        <Dropdown>
          <Dropdown.Toggle
            style={{ background: "transparent", border: "0px" }}
            variant="success"
            id="dropdown-basic"
          >
            {user && user.displayName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleOpenImageRef}>
              프로필 사진 변경
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <input
        onChange={handleUploadImage}
        type="file"
        accept="image/jpeg, image/png"
        ref={inputOpenImageRef}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default UserPanel;
