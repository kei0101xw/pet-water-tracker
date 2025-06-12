import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/UserEditPage.css";

const UserEditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state;

  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return <p>ユーザー情報がありません。前のページからやり直してください。</p>;
  }

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_TEST_URL}/api/v1/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("ユーザー情報が更新されました！");
        navigate("/");
      } else {
        setError(
          "更新に失敗しました。" + (data.message || JSON.stringify(data))
        );
      }
    } catch (err) {
      console.error("更新エラー:", err);
      setError("更新に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-container">
      <h1 className="edit-title">ユーザー編集ページ</h1>

      <div className="edit-field">
        <label>
          ユーザー名:{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="edit-input"
          />
        </label>
      </div>

      <div>
        <label>
          メールアドレス:{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="edit-input"
          />
        </label>
      </div>

      {error && <p className="edit-error">{error}</p>}

      <div className="edit-buttons">
        <button className="edit-button cancel" onClick={() => navigate(-1)}>
          キャンセル
        </button>
        <button
          className="edit-button submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "保存中..." : "修正完了"}
        </button>
      </div>
    </div>
  );
};

export default UserEditPage;
