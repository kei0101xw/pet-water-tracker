import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  if (!user) {
    return <p>ユーザー情報が見つかりません。</p>;
  }

  const handleRegister = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_TEST_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(user),
        }
      );

      if (!res.ok) {
        throw new Error("登録に失敗しました");
      }

      alert("登録が完了しました！");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="confirm-page">
      <h1 className="confirm-title">ユーザー情報確認</h1>
      <p className="confirm-item">
        <strong>ユーザー名:</strong> {user.username}
      </p>
      <p className="confirm-item">
        <strong>メールアドレス:</strong> {user.email}
      </p>
      <p className="confirm-item">
        <strong>パスワード:</strong> {"*".repeat(user.password.length)}
      </p>
      <div className="confirm-buttons">
        <button
          className="confirm-button back"
          onClick={() => navigate("/user/register", { state: { user } })}
        >
          戻る
        </button>
        <button className="confirm-button submit" onClick={handleRegister}>
          登録
        </button>
      </div>
    </div>
  );
};

export default UserConfirm;
