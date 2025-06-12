import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../pages/PetEditPage.css";

const PetEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pet = location.state?.pet;

  const [name, setName] = useState(pet?.name || "");
  const [species, setSpecies] = useState(pet?.species || "dog");
  const [breed, setBreed] = useState(pet?.breed || "");
  const [weightKg, setWeightKg] = useState(pet?.weightKg || "");
  const [birthdate, setBirthdate] = useState(
    pet?.birthdate ? pet.birthdate.slice(0, 10) : ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPet = {
      name,
      species,
      breed,
      weightKg: parseFloat(weightKg),
      birthdate,
    };

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_TEST_URL}/api/v1/pets/mine`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include", // クッキー送信のために必要
          body: JSON.stringify(updatedPet),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("ペット情報が更新されました！");
        navigate("/pet/info");
      } else {
        alert("更新に失敗しました: " + (data.message || JSON.stringify(data)));
      }
    } catch (err) {
      console.error(err);
      alert("通信エラーが発生しました");
    }
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
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          種類:
          <select value={species} onChange={(e) => setSpecies(e.target.value)}>
            <option value="dog">犬</option>
            <option value="cat">猫</option>
          </select>
        </label>
        <label>
          品種:
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </label>
        <label>
          体重 (kg):
          <input
            type="number"
            step="0.1"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
          />
        </label>
        <label>
          誕生日:
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
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
