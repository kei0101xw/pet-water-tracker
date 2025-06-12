import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BowlConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bowlWeight = location.state?.bowlWeight;

  if (bowlWeight === undefined) {
    return <p>皿の情報が見つかりません。</p>;
  }

  const handleBack = () => {
    // 戻るときに状態を持ったまま戻る
    navigate("/setting/bowl", { state: { bowlWeight } });
  };

  const handleRegister = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/api/v1/water-bowl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bowlWeight }),
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error || "登録に失敗しました");
      }

      alert("皿の登録が完了しました！");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bowl-confirm-container">
      <h1>皿の重量 確認</h1>
      <p>
        <strong>皿の重量:</strong> {bowlWeight} g
      </p>

      <div className="bowl-confirm-buttons">
        <button onClick={handleBack}>戻る</button>
        <button onClick={handleRegister}>登録</button>
      </div>
    </div>
  );
};

export default BowlConfirm;
