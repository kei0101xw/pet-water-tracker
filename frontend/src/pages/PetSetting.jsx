import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PetSetting.css";

const PetSetting = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [pet, setPet] = useState({
    name: "",
    species: "",
    breed: "",
    weightKg: "",
    birthdate: "",
  });

  // 戻ってきたときに state を反映させる処理
  useEffect(() => {
    if (location.state?.pet) {
      setPet(location.state.pet);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 本来は userId を含めてバックエンドへ送信する想定
    navigate("/confirm/pet", { state: { pet } });
  };

  return (
    <div className="pet-setting-container">
      <h1 className="pet-setting-title">ペット情報登録</h1>
      <form onSubmit={handleSubmit} className="pet-setting-form">
        <label>
          名前:
          <input
            type="text"
            name="name"
            value={pet.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          種類:
          <select
            name="species"
            value={pet.species}
            onChange={handleChange}
            required
          >
            <option value="">選択してください</option>
            <option value="dog">犬</option>
            <option value="cat">猫</option>
          </select>
        </label>

        <label>
          犬種・猫種:
          <input
            type="text"
            name="breed"
            value={pet.breed}
            onChange={handleChange}
          />
        </label>

        <label>
          体重 (kg):
          <input
            type="number"
            name="weightKg"
            value={pet.weightKg}
            onChange={handleChange}
            step="0.1"
            min="0"
            required
          />
        </label>

        <label>
          誕生日:
          <input
            type="date"
            name="birthdate"
            value={pet.birthdate}
            onChange={handleChange}
          />
        </label>

        <div className="pet-setting-buttons">
          <button type="submit">確認</button>
        </div>
        <button
          type="button"
          onClick={() => navigate("/setting")}
          className="pet-setting-back"
        >
          戻る
        </button>
      </form>
    </div>
  );
};

export default PetSetting;
