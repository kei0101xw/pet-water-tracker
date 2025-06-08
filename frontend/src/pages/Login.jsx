import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../pages/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        { email, password },
        { withCredentials: true } //これでクッキーを送信
      );
      setUser(res.data.user);
      setMessage("ログイン成功: " + res.data.user.email);
      navigate("/");
    } catch (err) {
      setMessage("ログイン失敗: " + err.response?.data || "エラー");
    }
  };

  return (
    <div className="login-container">
      <h1 className="app-title">ペット水量計測アプリ</h1>
      <div className="login-box">
        {/* <h2 className="login-title">ログイン</h2> */}
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button submit">
            ログイン
          </button>
          <button
            type="button"
            className="login-button register"
            onClick={() => navigate("/user/register")}
          >
            新規登録の方はこちら
          </button>

          {message && <p className="login-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
