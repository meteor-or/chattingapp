import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const auth = getAuth();

      await signInWithEmailAndPassword(auth, data.email, data.password);

      setLoading(false);
    } catch (error) {
      setErrorFromSubmit(error.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* 회원 가입 폼 */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 이메일 */}
        <h2>이메일로 로그인</h2>
        <label>이메일</label>
        <input
          name="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>이메일이 비었어요!</p>}
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
        <input type="submit" value="로그인하기" disabled={loading} />
        <Link style={{ color: "gray", textDecoration: "none" }} to="/register">
          아이디가 없으신가요?
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
