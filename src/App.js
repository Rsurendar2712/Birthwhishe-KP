import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Candle from "./pages/Candle/Candle.jsx";
import Emoji from "./pages/Emoji/Emoji.jsx";
import Gallery from "./pages/Gallery/Gallery.jsx";
import Final from "./pages/Final/Final.jsx";

// Flow: Login -> Candle -> Emoji -> Gallery -> Final
export default function App() {
  const location = useLocation();
  return (
    // key forces a remount so the fade-in plays on every page change
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<Login />} />
        <Route path="/candle" element={<Candle />} />
        <Route path="/emoji" element={<Emoji />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/final" element={<Final />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
