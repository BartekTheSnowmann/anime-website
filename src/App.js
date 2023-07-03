import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SingleAnime from "./pages/SingleAnime";
import Error from "./pages/Error";
import TopAnime from "./pages/TopAnime";
import Favorites from "./pages/Favorites";
import { FavoriteProvider } from "./context/FavoriteContext";
import { AnimatePresence } from "framer-motion";

function App() {
  const [theme, setTheme] = useState("Light");
  const location = useLocation();

  return (
    <div
      className={
        theme === "Dark"
          ? "bg-[#212121] min-h-[100vh]"
          : "bg-white min-h-[100vh]"
      }
    >
      <FavoriteProvider>
        <Navbar setTheme={setTheme} theme={theme} />
        <AnimatePresence location={location}>
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route
              path="/singleanime/:type/:id"
              element={<SingleAnime theme={theme} />}
            />
            <Route path="*" element={<Error />} />
            <Route path="/top" element={<TopAnime theme={theme} />} />
            <Route path="/favorites" element={<Favorites theme={theme} />} />
            {/* <Route path="/profile" element={<Profile theme={theme} />} /> */}
          </Routes>
        </AnimatePresence>
      </FavoriteProvider>
    </div>
  );
}

export default App;
