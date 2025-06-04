import React from "react";
import { useParams } from "react-router-dom";
import { petList } from "./PetData";
import "./PetDetail.css";

const PetDetail = () => {
  const { id } = useParams();
  const pet = petList.find((p) => p.id === parseInt(id));

  if (!pet) {
    return (
      <div className="pet-detail-container">ペットが見つかりませんでした。</div>
    );
  }

  return (
    <div className="pet-detail-container">
      <h2 className="pet-detail-title">{pet.name}の情報</h2>
      <ul className="pet-info">
        <li>犬or猫: {pet.dogcat}</li>
        <li>種類: {pet.type}</li>
        <li>年齢: {pet.age}歳</li>
        <li>体重: {pet.weight}g</li>
        <li>誕生日: {pet.birthday}</li>
      </ul>
    </div>
  );
};

export default PetDetail;
