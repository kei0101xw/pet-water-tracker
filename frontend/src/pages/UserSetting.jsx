import React, { useState } from "react";
import "./UserSetting.css";

const UserSetting = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

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
    alert(`ユーザー情報を保存しました: ${user.username} / ${user.email}`);
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
        <button type="submit" className="user-setting-save">
          保存
        </button>
      </form>
    </div>
  );
};

export default UserSetting;
