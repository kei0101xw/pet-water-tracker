import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/PetPage.css";

const PetPage = () => {
  const navigate = useNavigate();

  const handleRegisterPet = () => {
    navigate("/pet/register");
  };

  const handlePetSettings = () => {
    navigate("/pet/info");
  };

  const handleGoBack = () => {
    navigate("/setting");
  };

  return (
    <div className="container">
      <h1 className="title">ペット管理ページ</h1>
      <div className="buttonGroup">
        <button onClick={handleRegisterPet} className="registerButton">
          ペットの登録
        </button>
        <button onClick={handlePetSettings} className="settingsButton">
          ペットの設定
        </button>
      </div>
      <div className="backButtonWrapper">
        <button onClick={handleGoBack} className="backButton">
          戻る
        </button>
      </div>
    </div>
  );
};

export default PetPage;
