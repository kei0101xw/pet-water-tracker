import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../pages/PetEditPage.css";

const PetEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pet = location.state?.pet;

  const handleSubmit = (e) => {
    e.preventDefault();
    // 編集送信ロジックはここに
    alert("編集処理をここに実装してください");
  };

  if (!pet) {
    return <p className="error">編集するペット情報がありません。</p>;
  }

  return (
    <div className="edit-container">
      <h1 className="edit-title">ペット情報の編集</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <label>
          名前:
          <input type="text" defaultValue={pet.name} />
        </label>
        <label>
          種類:
          <select defaultValue={pet.species}>
            <option value="dog">犬</option>
            <option value="cat">猫</option>
          </select>
        </label>
        <label>
          品種:
          <input type="text" defaultValue={pet.breed} />
        </label>
        <label>
          体重 (kg):
          <input type="number" step="0.1" defaultValue={pet.weightKg} />
        </label>
        <label>
          誕生日:
          <input type="date" defaultValue={pet.birthdate?.slice(0, 10)} />
        </label>
        <div className="button-group">
          <button
            type="button"
            className="btn btn-back"
            onClick={() => navigate("/pet/info")}
          >
            戻る
          </button>
          <button type="submit" className="btn btn-save">
            保存
          </button>
        </div>
      </form>
    </div>
  );
};

export default PetEditPage;
