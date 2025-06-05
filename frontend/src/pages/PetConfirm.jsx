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

  const handleRegister = () => {
    // 実際の登録処理（API呼び出しなど）をここに実装
    alert("登録が完了しました！");
    navigate("/home");
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
        <button onClick={() => navigate(-1)}>戻る</button>
        <button onClick={handleRegister}>登録</button>
      </div>
    </div>
  );
};

export default PetConfirm;
