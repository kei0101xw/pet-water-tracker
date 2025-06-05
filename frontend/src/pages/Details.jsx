import React from "react";
import { useNavigate } from "react-router-dom";
import "./Details.css";

const Details = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);

  return (
    <div className="details-container">
      <h1 className="details-title">ペット一覧</h1>
      <ul className="pet-list">
        {pets.map((pet) => (
          <li key={pet._id}>
            <button
              className="pet-button"
              onClick={() => navigate(`/details/${pet._id}`)}
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
