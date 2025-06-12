import React, { useState, useEffect } from "react";
import "./Details.css";

const Details = () => {
  const [pet, setPet] = useState(null);

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

        if (!res.ok) {
          throw new Error("ペット情報の取得に失敗しました");
        }

        const data = await res.json();
        setPet(data); // 単一オブジェクトの場合も配列に
      } catch (err) {
        console.error(err.message);
        setPet(null); // エラー時にも空配列をセットしておく
      }
    };

    fetchPet();
  }, []);

  const getSpeciesLabel = (species) => {
    if (species === "dog") return "犬";
    if (species === "cat") return "猫";
    return species || "不明";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "不明";
    const date = new Date(dateStr);
    return date.toLocaleDateString("ja-JP");
  };

  return (
    <div className="details-container">
      <h1 className="details-title">ペット情報</h1>
      {pet ? (
        <div>
          <h2>名前: {pet.name}</h2>
          <p>種類: {getSpeciesLabel(pet.species)}</p>
          <p>品種: {pet.breed || "不明"}</p>
          <p>体重: {pet.weightKg} kg</p>
          <p>誕生日: {formatDate(pet.birthdate)}</p>
        </div>
      ) : (
        <p>ペット情報が見つかりません。</p>
      )}
    </div>
  );
};

export default Details;
