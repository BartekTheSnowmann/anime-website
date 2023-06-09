import React from "react";
import { AiFillGithub, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Logo } from "../assets/Index";

function Footer({ theme }) {
  return (
    <div
      style={theme === "Light" ? { color: "#212121" } : { color: "white" }}
      className="max-w-[1240px] mx-auto py-10 px-4"
    >
      <div className="flex justify-center gap-10 border-b-2 pb-6">
        <div>
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-10" />
          </Link>
          <p></p>
        </div>

        <div>
          <h1 className="font-bold pb-4">Navigation</h1>
          <ul className="flex flex-col">
            {["Home", "Upcoming", "Recommended"].map((item, index) => (
              <li key={index}>
                <a href={`#${item}`}>{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-6 flex gap-x-4 justify-center">
        <AiFillYoutube className="cursor-pointer text-[#c4302b]" size={30} />
        <AiFillGithub className="cursor-pointer" size={30} />
        <AiFillLinkedin className="cursor-pointer text-[#0e76a8]" size={30} />
      </div>
      <h1 className="text-center tracking-widest pt-3 text-gray-400">
        Made with use of JikanApi
      </h1>
    </div>
  );
}

export default Footer;
