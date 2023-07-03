import React, { useEffect, useState } from "react";
import useAxios from "../hooks/UseAxios";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useFetcher, useNavigate } from "react-router-dom";

function Carousel({ theme }) {
  const { data, loading } = useAxios(
    "https://api.jikan.moe/v4/seasons/upcoming"
  );
  const CarouselRef = useRef();
  const [windowSize, setWindowSize] = useState({ width: 0 });
  const pathname = window.location.pathname;

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width:
          CarouselRef?.current.scrollWidth - CarouselRef?.current.offsetWidth,
      });
    }
    handleResize();
  }, [data, pathname]);

  const navigate = useNavigate();
  const NavigateToAnime = (id) => {
    navigate(`/singleanime/anime/${id}`);
  };

  return (
    <div
      style={
        theme === "Light"
          ? { background: "white", color: "#212121" }
          : { background: "#212121", color: "white" }
      }
      className="py-12"
      id="Upcoming"
    >
      <div className="overflow-hidden" ref={CarouselRef}>
        <div className="pb-12 flex items-end max-w-[1240px] min-h-[100px] mx-auto">
          <h1 className="font-bold text-lg sm:text-3xl text-left uppercase px-4">
            Upcoming
          </h1>
          <p className="text-gray-400">(click a title)</p>
        </div>

        <motion.div
          className="grid gap-x-4 grid-flow-col"
          drag="x"
          whileTap={{ cursor: "grabbing" }}
          dragConstraints={{
            right: 0,
            left: -windowSize.width,
          }}
          key={Date.length}
        >
          {loading === false ? (
            data.map((item) => (
              <motion.div
                key={item.mal_id}
                className="hover:scale-105 duration-300 w-[200px]"
              >
                <img
                  src={item.images.jpg.image_url}
                  alt=""
                  loading="lazy"
                  className="pointer-events-none"
                />
                <h1
                  className="font-bold p-2 cursor-pointer drop-shadow-lg"
                  onClick={() => NavigateToAnime(item.mal_id)}
                >
                  {item.title.length > 40
                    ? item.title.slice(0, 28) + "..."
                    : item.title}
                </h1>
              </motion.div>
            ))
          ) : (
            <motion.div className="grid gap-x-4 grid-flow-col">
              <motion.div className="w-[200px] h-[260px] animate-pulse bg-gray-600"></motion.div>
              <motion.div className="w-[200px] h-[260px] animate-pulse bg-gray-600"></motion.div>
              <motion.div className="w-[200px] h-[260px] animate-pulse bg-gray-600"></motion.div>
              <motion.div className="w-[200px] h-[260px] animate-pulse bg-gray-600"></motion.div>
              <motion.div className="w-[200px] h-[260px] animate-pulse bg-gray-600"></motion.div>
              <motion.div className="w-[200px] h-[260px] animate-pulse bg-gray-600"></motion.div>
              <motion.div className="w-[200px] h-[260px] animate-pulse bg-gray-600"></motion.div>
              <motion.div className="w-[200px] h-[260px] animate-pulse bg-gray-600"></motion.div>
              <motion.div className="w-[200px] h-[260px] animate-pulse bg-gray-600"></motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Carousel;
