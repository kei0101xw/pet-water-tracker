import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
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
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/details" element={<Details />} />
          <Route path="/details/:id" element={<PetDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
