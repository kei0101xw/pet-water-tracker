import React from "react";
import { useNavigate } from "react-router-dom";
import { petList } from "./pages/petData";
import "./Details.css";

const Details = () => {
  const navigate = useNavigate();

  return (
    <div className="details-container">
      <h1 className="details-title">ペット一覧</h1>
      <ul className="pet-list">
        {petList.map((pet) => (
          <li key={pet.id}>
            <button
              className="pet-button"
              onClick={() => navigate(`/details/${pet.id}`)}
            >
              {pet.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Details;
