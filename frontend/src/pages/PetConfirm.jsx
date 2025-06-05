import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PetConfirm.css";

const PetConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pet = location.state?.pet;

  if (!pet) {
    return <p>ペット情報が見つかりません。</p>;
  }

  // species の表示を日本語に変換
  const getSpeciesLabel = (value) => {
    switch (value) {
      case "dog":
        return "犬";
      case "cat":
        return "猫";
      default:
        return value;
    }
  };

  //サーバーに送る
  const handleRegister = async () => {
    try {
      const response = await fetch("/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pet),
      });

      if (!response.ok) {
        throw new Error("登録に失敗しました");
      }

      alert("登録が完了しました！");
      navigate("/home");
    } catch (error) {
      console.error("登録エラー:", error);
      alert("登録に失敗しました");
    }
  };

  const handleBack = () => {
    navigate("/setting/pet", { state: { pet } }); // ← 情報を持ったまま戻る
  };

  return (
    <div className="pet-confirm-container">
      <h1 className="pet-confirm-title">ペット情報の確認</h1>
      <div className="pet-confirm-content">
        <p>
          <strong>名前:</strong> {pet.name}
        </p>
        <p>
          <strong>種類:</strong> {getSpeciesLabel(pet.species)}
        </p>
        <p>
          <strong>犬種・猫種:</strong> {pet.breed || "未入力"}
        </p>
        <p>
          <strong>体重:</strong> {pet.weightKg} kg
        </p>
        <p>
          <strong>誕生日:</strong>{" "}
          {pet.birthdate
            ? new Date(pet.birthdate).toLocaleDateString()
            : "未入力"}
        </p>
      </div>

      <div className="pet-confirm-buttons">
        <button onClick={handleBack}>戻る</button>
        <button onClick={handleRegister}>登録</button>
      </div>
    </div>
  );
};

export default PetConfirm;
