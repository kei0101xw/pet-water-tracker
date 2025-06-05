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
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("登録に失敗しました");
      }

      // 成功時の処理
      alert("登録が完了しました！");
      navigate("/home"); // ホーム画面などにリダイレクト
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="confirm-page">
      <h1>ユーザー情報確認</h1>
      <p>
        <strong>ユーザー名:</strong> {user.username}
      </p>
      <p>
        <strong>メールアドレス:</strong> {user.email}
      </p>
      <p>
        <strong>パスワード:</strong> {"*".repeat(user.password.length)}
      </p>
      <button onClick={() => navigate("/setting/user", { state: { user } })}>
        戻る
      </button>
      <button onClick={handleRegister}>登録</button>
    </div>
  );
};

export default UserConfirm;
