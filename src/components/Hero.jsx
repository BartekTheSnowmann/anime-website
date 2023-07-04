import React from "react";
import { Itachi } from "../assets/Index";

function Hero() {
  return (
    <div id="Home">
      <div className="relative min-h-[500px]">
        <img
          src={Itachi}
          alt=""
          loading="lazy"
          className="min-h-[500px] max-h-[800px] w-full object-cover"
        />
        <div className="bg-gray-800/60 absolute top-0 left-0 w-full h-full">
          <div className="text-white max-w-[1240px] mx-auto h-full flex flex-col justify-center items-start px-4">
            <div className="max-w-[500px] uppercase">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase">
                AnimeWEB
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 py-4">
                The Art of Anime.
              </p>
            </div>
            <a href="#Recommended">
              <button className="border-2 border-white py-2 px-4 hover:bg-white hover:text-black">
                Get Started
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
