import React from "react";

function LoginPage() {
  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: "center" }}>
        <h3>Login</h3>
      </div>
      <form>
        <label>이메일</label>
        <input name="email" type="email" />

        <label>비밀번호</label>
        <input name="password" type="password" />

        <input type="submit" value="로그인하기" />
      </form>
    </div>
  );
}

export default LoginPage;
