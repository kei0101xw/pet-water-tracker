import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Analysis from "./pages/Analysis";
import WaterAnalysis from "./pages/WaterAnalysis";
import Setting from "./pages/Setting";
import UserSetting from "./pages/UserSetting";
import UserConfirm from "./pages/UserConfirm";
import PetSetting from "./pages/PetSetting";
import PetConfirm from "./pages/PetConfirm";
import BowlSetting from "./pages/BowlSetting.jsx";
import BowlConfirm from "./pages/BowlConfirm";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Details from "./pages/Details";
import PetDetail from "./pages/PetDetail";

function App() {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/analysis/water" element={<WaterAnalysis />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/setting/user" element={<UserSetting />} />
          <Route path="/confirm/user" element={<UserConfirm />} />
          <Route path="/setting/pet" element={<PetSetting />} />
          <Route path="/confirm/pet" element={<PetConfirm />} />
          <Route path="/setting/bowl" element={<BowlSetting />} />
          <Route path="/confirm/bowl" element={<BowlConfirm />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/details" element={<Details />} />
          <Route path="/details/:id" element={<PetDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
