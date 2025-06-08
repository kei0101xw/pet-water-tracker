import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import WaterAnalysis from "./pages/WaterAnalysis";
import Setting from "./pages/Setting";
import UserRegister from "./pages/UserRegister";
import UserSetting from "./pages/UserSetting";
import UserConfirm from "./pages/UserConfirm";
import UserPage from "./pages/UserPage";
import UserEditPage from "./pages/UserEditPage";
import PetPage from "./pages/PetPage";
import PetInfo from "./pages/PetInfo";
import PetEditPage from "./pages/PetEditPage";
import PetRegister from "./pages/PetRegister";
import PetConfirm from "./pages/PetConfirm";
import BowlSetting from "./pages/BowlSetting.jsx";
import BowlConfirm from "./pages/BowlConfirm";
import NotFound from "./pages/NotFound";
import Details from "./pages/Details";
import PetDetail from "./pages/PetDetail";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/user/register" element={<UserRegister />} />
            <Route element={<ProtectedRoute />}>
              {/* ログインしていないとアクセスしてはいけないページはこの階層に追加！ */}
              <Route path="/" element={<Home />} />
              <Route path="/analysis/water" element={<WaterAnalysis />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/user/edit" element={<UserEditPage />} />
              <Route path="/user/setting" element={<UserSetting />} />
              <Route path="/user/confirm" element={<UserConfirm />} />
              <Route path="/pet" element={<PetPage />} />
              <Route path="/pet/register" element={<PetRegister />} />
              <Route path="/pet/confirm" element={<PetConfirm />} />
              <Route path="/pet/info" element={<PetInfo />} />
              <Route path="/pet/edit" element={<PetEditPage />} />
              <Route path="/setting/bowl" element={<BowlSetting />} />
              <Route path="/confirm/bowl" element={<BowlConfirm />} />
              <Route path="/details" element={<Details />} />
              <Route path="/details/:id" element={<PetDetail />} />
              {/* ログインしていないとアクセスしてはいけないページはこの階層に追加！ */}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
