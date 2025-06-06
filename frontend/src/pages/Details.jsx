import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Details.css";

const Details = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem("token"); // 認証が必要なら
        const res = await axios.get("/api/pets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPets(res.data);
      } catch (err) {
        console.error("ペット情報の取得に失敗しました:", err.message);
      }
    };

    fetchPets();
  }, []);

  const getSpeciesLabel = (species) => {
    if (species === "dog") return "犬";
    if (species === "cat") return "猫";
    return species || "不明";
  };

  return (
    <div className="details-container">
      <h1 className="details-title">ペット一覧</h1>

      {pets.length === 0 ? (
        <p>ペット情報がありません。</p>
      ) : (
        <div className="pet-card-list">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="pet-card"
              onClick={() => navigate(`/details/${pet._id}`)}
            >
              <h2>{pet.name}</h2>
              <p>種類: {getSpeciesLabel(pet.species)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Details;
