import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../pages/UserPage.css";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/v1/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log("取得したユーザー:", res.data);
        setUser(res.data.user);
      } catch (err) {
        console.error("ユーザー取得エラー:", err.response || err);
        setError("ユーザー情報の取得に失敗しました");
      }
    };

    fetchUser();
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>読み込み中...</p>;

  return (
    <div className="user-container">
      <h1 className="user-title">ユーザーページ</h1>
      <p className="user-info">
        <strong>ユーザー名:</strong> {user.username ?? "(未設定)"}
      </p>
      <p className="user-info">
        <strong>メールアドレス:</strong> {user.email}
      </p>

      <div className="user-buttons">
        <button className="user-button" onClick={() => navigate(-1)}>
          戻る
        </button>
        <button
          className="user-button"
          onClick={() => navigate("/user/edit", { state: user })}
        >
          修正
        </button>
      </div>
    </div>
  );
};

export default UserPage;
