import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Setting.css";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Setting = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [isPetRegistered, setIsPetRegistered] = useState(false);

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/v1/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("ログアウト失敗:", err);
    }
  };

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

        if (res.ok) {
          const data = await res.json();
          if (data) {
            setIsPetRegistered(true);
          }
        }
      } catch (error) {
        console.error("ペット情報の取得に失敗:", error);
      }
    };

    fetchPet();
  }, []);

  const handleRegisterPet = () => {
    navigate("/pet/register");
  };

  const handlePetSettings = () => {
    navigate("/pet/info");
  };

  return (
    <div className="setting-container">
      <h1 className="setting-title">設定メニュー</h1>
      <div className="setting-buttons">
        <button onClick={() => navigate("/user")} className="setting-button">
          ユーザー情報
        </button>
        {isPetRegistered ? (
          <button onClick={handlePetSettings} className="setting-button">
            ペットの設定
          </button>
        ) : (
          <button onClick={handleRegisterPet} className="setting-button">
            ペットの登録
          </button>
        )}
        <button
          onClick={() => navigate("/setting/bowl")}
          className="setting-button"
        >
          皿の重量設定
        </button>
        <button
          onClick={() => navigate("/setting/sensor")}
          className="setting-button"
        >
          センサ設定
        </button>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="setting-button"
        >
          ログアウト
        </button>
      </div>
    </div>
  );
};

export default Setting;
