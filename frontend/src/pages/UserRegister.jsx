import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserRegister.css";

const UserRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // 戻ってきたときに state から値を復元
  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここでAPIに送信するなどの処理を追加予定
    navigate("/user/confirm", { state: { user } });
  };

  return (
    <div className="user-setting-container">
      <h1 className="user-setting-title">新規登録</h1>
      <form onSubmit={handleSubmit} className="user-setting-form">
        <label>
          <div className="login-input-label">ユーザー名:</div>
          <input
            type="String"
            name="username"
            placeholder="ユーザー名"
            value={user.username}
            onChange={handleChange}
          />
        </label>
        <label>
          <div className="login-input-label">メールアドレス:</div>
          <input
            type="email"
            name="email"
            placeholder="メールアドレス"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <label>
          <div className="login-input-label">パスワード:</div>
          <input
            type="password"
            name="password"
            placeholder="パスワード"
            value={user.password}
            onChange={handleChange}
          />
        </label>
        <div className="register-button-group">
          <button type="submit" className="user-setting-save">
            確認画面へ
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="user-setting-back"
          >
            戻る
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
