import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PetRegister.css";

const PetRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [pet, setPet] = useState({
    name: "",
    species: "",
    breed: "",
    weightKg: "",
    birthdate: "",
  });

  const [showAlreadyRegistered, setShowAlreadyRegistered] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${import.meta.env.VITE_TEST_URL}/api/v1/pets/mine`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          if (data) {
            setShowAlreadyRegistered(true);
          }
        }
      } catch (error) {
        console.error("ペット情報の取得に失敗:", error);
      }
    };

    fetchPet();
  }, []);

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
    navigate("/pet/confirm", { state: { pet } });
  };

  const handleAlreadyRegisteredOk = () => {
    navigate("/setting"); // ホーム画面への遷移
  };

  return (
    <div className="pet-setting-container">
      {showAlreadyRegistered ? (
        <div className="already-registered-message">
          <p>既にペットは登録されています。</p>
          <button onClick={handleAlreadyRegisteredOk}>OK</button>
        </div>
      ) : (
        <>
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
              <button type="submit">次へ</button>
            </div>
            <button
              type="button"
              onClick={() => navigate("/pet")}
              className="pet-setting-back"
            >
              戻る
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PetRegister;
