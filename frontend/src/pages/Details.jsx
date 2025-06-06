import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Details.css";

const Details = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:4000/api/v1/pets/mine", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("ペット情報の取得に失敗しました");
        }

        const data = await res.json();

        setPets([data]); // 単一オブジェクトの場合も配列に
      } catch (err) {
        console.error(err.message);
        setPets([]); // エラー時にも空配列をセットしておく
      }
    };

    fetchPet();
  }, []);

  const getSpeciesLabel = (species) => {
    if (species === "dog") return "犬";
    if (species === "cat") return "猫";
    return species || "不明";
  };

  return (
    <div className="details-container">
      <h1 className="details-title">ペット一覧</h1>
      <div className="pet-card-list">
        {pets.map((pet) => (
          <div
            key={pet._id}
            className="pet-card"
            onClick={() => navigate(`/details/${pet._id}`)}
          >
            <h2>{pet.name}</h2>
            <p>{getSpeciesLabel(pet.species)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
