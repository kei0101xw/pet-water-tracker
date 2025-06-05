import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { petList } from "./PetData";
import "./PetDetail.css";

const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/pets/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("ペットの詳細情報の取得に失敗しました");
        }

        const data = await res.json();
        setPet(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPet();
  }, [id]);

  const getSpeciesLabel = (species) => {
    if (species === "dog") return "犬";
    if (species === "cat") return "猫";
    return species || "不明";
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!pet) {
    return <p>読み込み中...</p>;
  }

  return (
    <div className="pet-detail-container">
      <h1>ペット詳細</h1>
      <div className="pet-detail-card">
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
      <button onClick={() => navigate(-1)} className="back-button">
        戻る
      </button>
    </div>
  );
};

export default PetDetail;
