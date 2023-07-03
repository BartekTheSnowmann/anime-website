import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Logo, Logo2 } from "../assets/Index";
import SearchBar from "./SearchBar";
import DarkMode from "./DarkMode";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";

function Navbar({ theme, setTheme }) {
  const [showMenu, SetShowMenu] = useState(false);
  const toggleMenu = () => {
    SetShowMenu((prev) => !prev);
  };

  return (
    <nav className="w-full h-20 z-10">
      <div
        style={
          theme === "Light"
            ? { background: "white", color: "#212121" }
            : { background: "#212121", color: "white" }
        }
        className="fixed w-full -translate-x-1/2 z-10 left-1/2 h-20 shadow-lg"
      >
        <div className="max-w-[1240px] mx-auto h-20 flex items-center justify-between p-4">
          {/* Logo */}
          <div>
            <Link to="/">
              {theme === "Dark" ? (
                <img src={Logo} alt="Logo" className="h-10" />
              ) : (
                <img src={Logo2} alt="Logo" className="h-10" />
              )}
            </Link>
          </div>
          {/* SearchBar */}
          <div>
            <SearchBar theme={theme} />
          </div>
          {/* Navigation + Profile */}
          <div className="hidden md:flex gap-4 items-center">
            <ul className="flex">
              <Link to="/favorites">
                <li>Favorites</li>
              </Link>
              <Link to="/top">
                <li>Top</li>
              </Link>
            </ul>
            <DarkMode theme={theme} setTheme={setTheme} />
          </div>
          <div className="md:hidden" onClick={toggleMenu}>
            <AiOutlineMenu size={30} />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            style={
              theme === "Dark"
                ? { background: "#212121", color: "white" }
                : { background: "white" }
            }
            className="md:hidden h-screen w-1/2 shadow-lg fixed top-0 right-0 z-50"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: "tween" }}
          >
            <div className="h-20 p-4 flex justify-end items-center">
              <div className="" onClick={toggleMenu}>
                <AiOutlineClose size={30} className="text-black" />
              </div>
            </div>
            <div>
              <DarkMode theme={theme} setTheme={setTheme} />
              <ul className="flex flex-col items-center gap-4 py-6">
                <Link to="/">
                  <li onClick={() => SetShowMenu(false)}>Home</li>
                </Link>
                <Link to="/favorites">
                  <li onClick={() => SetShowMenu(false)}>Favorites</li>
                </Link>
                <Link to="/top">
                  <li onClick={() => SetShowMenu(false)}>Top</li>
                </Link>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
