import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import md5 from "md5";
import { getDatabase, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function RegisterPage() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const password = useRef();
  password.current = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const auth = getAuth();
      let createdUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: `http:gravatar.com/avatar/${md5(
          createdUser.user.email
        )}?d=identicon`,
      });

      //Firebase 데이터베이스에 저장해주기

      set(ref(getDatabase(), `users/${createdUser.user.uid}`), {
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL,
      });

      setLoading(false);
    } catch (error) {
      setErrorFromSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };

  /* useRef로 비밀번호 기억해두기!
    Js에서는 querySelector로 Dom을 선택하지만 리액트에서는 ref로 선택한다
    1. 클래스 컴포넌트 -> React.CreatRef
    2. 함수영 컴포넌트 -> useRef
  
    방법
    1. ref를 생성하고
    2. watch를 이용해서 password 필드 값을 가져오고 
    3. 가져온 password 값을 ref.current에 넣어주기
  */
  return (
    <div className="auth-wrapper">
      {/* 회원 가입 폼 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>이메일로 회원가입</h2>
        {/* 이메일 */}
        <label>이메일</label>
        <input
          name="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>이메일이 비었어요!</p>}
        {/* 이름! */}
        <label>이름</label>
        <input
          name="name"
          {...register("name", { required: true, maxLength: 10 })}
        />
        {/* 이름 각 유효성에 맞게 에러문구 출력 1.필수 2.최대길이 */}
        {errors.name && errors.name.type === "required" && (
          <p>이름이 비었어요!</p>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <p>이름이 너무 길어요😥 10자 이상으로 적어주세요!</p>
        )}
        {/* 비밀번호 */}
        <label>비밀번호</label>
        <input
          name="password"
          type="password"
          {...register("password", { required: true, minLength: 10 })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>비밀번호가 비었어요!</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p>비밀번호가이 너무 짧아요😥 10자 이상으로 적어주세요!</p>
        )}
        {/* 비밀번호 재확인 */}
        <label>비밀번호 재확인</label>
        <input
          name="password_comfirm"
          type="password"
          {...register("password_comfirm", {
            required: true,
            validate: (value) => value === password.current, //password === password.current
          })}
        />{" "}
        {errors.password_comfirm &&
          errors.password_comfirm.type === "required" && (
            <p>비밀번호를 다시 적어주세요!</p>
          )}{" "}
        {errors.password_comfirm &&
          errors.password_comfirm.type === "validate" && (
            <p>비밀번호가 같지 않아요</p>
          )}
        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        <input type="submit" value="가입하기" disabled={loading} />
        <Link style={{ color: "gray", textDecoration: "none" }} to="/login">
          이미 아이디가 있나요?
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
