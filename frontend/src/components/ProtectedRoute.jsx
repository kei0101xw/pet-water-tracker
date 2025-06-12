import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>読み込み中...</div>; // 読み込み中表示（任意）
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
