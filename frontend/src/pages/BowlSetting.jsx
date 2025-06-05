import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BowlSetting = () => {
  const [bowlWeight, setBowlWeight] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // 確認ページから戻ってきたときの値を復元
  useEffect(() => {
    if (location.state?.bowlWeight) {
      setBowlWeight(location.state.bowlWeight);
    }
  }, [location.state]);

  const handleConfirm = (e) => {
    e.preventDefault();
    navigate("/confirm/bowl", { state: { bowlWeight } });
  };

  return (
    <div className="bowl-setting-container">
      <h1>皿の重量設定</h1>
      <form onSubmit={handleConfirm}>
        <label>
          皿の重量（g）:
          <input
            type="number"
            value={bowlWeight}
            onChange={(e) => setBowlWeight(e.target.value)}
            required
            min="0"
            step="1"
          />
        </label>
        <button type="submit">次へ</button>
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

export default BowlSetting;
