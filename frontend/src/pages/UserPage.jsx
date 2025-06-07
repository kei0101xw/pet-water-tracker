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
    <div>
      <h1>ユーザーページ</h1>
      <p>
        <strong>ユーザー名:</strong> {user.username ?? "(未設定)"}
      </p>
      <p>
        <strong>メールアドレス:</strong> {user.email}
      </p>

      <p>
        <strong>作成日:</strong> {new Date(user.createdAt).toLocaleString()}
      </p>
      <button onClick={() => navigate(-1)}>戻る</button>
    </div>
  );
};

export default UserPage;
