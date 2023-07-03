import React, { useState } from "react";
import { motion } from "framer-motion";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

function DarkMode({ theme, setTheme }) {
  const [position, setPosition] = useState(true);
  const changeTheme = () => {
    setPosition((prev) => !prev);
    if (theme === "Light") {
      setTheme("Dark");
    } else {
      setTheme("Light");
    }
  };

  return (
    <div
      style={
        theme === "Light"
          ? { background: "#212121" }
          : { background: "#D41B3D" }
      }
      className="relative cursor-pointer w-16 mx-auto flex items-center justify-between bg-white p-[6px]"
      onClick={changeTheme}
    >
      <BsSunFill className="text-yellow-400 drop-shadow-lg" size={20} />
      <BsMoonFill className="text-gray-50 drop-shadow-lg" size={20} />
      <motion.div
        style={
          theme === "Light"
            ? { background: "white" }
            : { background: "#212121" }
        }
        initial={{ right: "4px" }}
        animate={position === true ? { right: "4px" } : { left: "4px" }}
        transition={{ type: "tween" }}
        className="z-10 w-6 h-6 absolute"
      ></motion.div>
    </div>
  );
}

export default DarkMode;
