import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserSetting.css";

const UserSetting = () => {
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
    navigate("/confirm/user", { state: { user } });
  };

  return (
    <div className="user-setting-container">
      <h1 className="user-setting-title">ユーザー設定</h1>
      <form onSubmit={handleSubmit} className="user-setting-form">
        <label>
          ユーザー名:
          <input
            type="String"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </label>
        <label>
          メールアドレス:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <label>
          パスワード:
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="user-setting-save">
          保存
        </button>
      </form>
    </div>
  );
};

export default UserSetting;
