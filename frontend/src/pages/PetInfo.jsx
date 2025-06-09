import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/PetInfo.css";

const PetInfo = () => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

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
        setPet(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, []);

  const handleDelete = async () => {
    if (!window.confirm("本当にペット情報を削除しますか？")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/api/v1/pets/mine", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("削除に失敗しました");
      }

      setPet(null);
      setMessage("ペット情報を削除しました");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="loading">読み込み中...</p>;
  if (error) return <p className="error">エラー: {error}</p>;
  if (!pet) return <p className="noPet">ペット情報が登録されていません。</p>;

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
    <div className="petinfo-container">
      <h1 className="petinfo-title">ペット情報</h1>
      {message && <p className="message">{message}</p>}
      {pet ? (
        <div>
          <h2>名前: {pet.name}</h2>
          <p>種類: {getSpeciesLabel(pet.species)}</p>
          <p>品種: {pet.breed || "不明"}</p>
          <p>体重: {pet.weightKg} kg</p>
          <p>誕生日: {formatDate(pet.birthdate)}</p>
          <div className="button-group">
            <button
              className="btn btn-back"
              onClick={() => navigate("/setting")}
            >
              戻る
            </button>
            <button
              className="btn btn-edit"
              onClick={() => navigate("/pet/edit", { state: { pet } })}
            >
              修正
            </button>
            <button className="btn btn-delete" onClick={handleDelete}>
              削除
            </button>
          </div>
        </div>
      ) : (
        <p>ペット情報が見つかりません。</p>
      )}
    </div>
  );
};

export default PetInfo;
