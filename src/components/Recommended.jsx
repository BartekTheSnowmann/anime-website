import React, { useEffect, useState } from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/UseAxios";

function Recommended() {
  const url = "https://api.jikan.moe/v4/recommendations/anime";
  const { data } = useAxios(url);

  const [currentAnime, setCurrentAnime] = useState(
    data[Math.floor(Math.random() * 25)]
  );
  const randomAnime = () => {
    const randomNumber = Math.floor(Math.random() * 25);
    setCurrentAnime(data[randomNumber]);
  };

  useEffect(() => {
    setTimeout(() => {
      randomAnime();
    }, 2500);
  }, [data]);

  const navigate = useNavigate();
  const NavigateToAnime = (id) => {
    navigate(`/singleanime/anime/${id}`);
  };

  const [progress, setProgress] = useState(0);
  let width = progress * -100 + "%";

  return (
    <div className="bg-[#D41B3D]" id="Recommended">
      <div className="text-white max-w-[1240px] min-h-[50vh] mx-auto px-4 py-16">
        <h1 className="text-5xl">Give it a try!</h1>

        <div className="grid md:grid-flow-col overflow-hidden mt-8 gap-8 relative">
          <div className="flex flex-col gap-8">
            <div>
              {currentAnime ? (
                <>
                  <h1
                    key={`content-${currentAnime.content}`}
                    className="text-xl"
                  >
                    " {currentAnime.content} "
                  </h1>
                </>
              ) : (
                <div className="w-full h-20 bg-gray-900 animate-pulse"></div>
              )}
            </div>
            {currentAnime
              ? currentAnime.entry.map((anime, index) =>
                  index === progress ? (
                    <div key={`title-${anime.index}`}>
                      <h1 className="text-xl drop-shadow-xl">
                        {anime.title.length > 18
                          ? anime.title.slice(0, 18) + "..."
                          : anime.title}
                      </h1>
                      <div className="divider bg-white"></div>
                    </div>
                  ) : (
                    ""
                  )
                )
              : ""}
          </div>

          <div className="flex gap-3">
            <AiFillLeftCircle
              size={50}
              onClick={() => setProgress(0)}
              className="cursor-pointer"
            />

            <AiFillRightCircle
              size={50}
              onClick={() => setProgress(1)}
              className="cursor-pointer"
            />
          </div>

          <div className="w-full overflow-hidden">
            <div
              style={{ left: width }}
              className="grid grid-flow-col w-[200%] relative transition-all duration-300"
            >
              {currentAnime ? (
                currentAnime.entry.map((anime) => (
                  <div
                    key={`anime-${anime.title}`}
                    className="w-full h-full cursor-pointer"
                    onClick={() => NavigateToAnime(anime.mal_id)}
                  >
                    <img
                      src={anime.images.jpg.image_url}
                      loading="lazy"
                      className="w-full"
                    />
                  </div>
                ))
              ) : (
                <div className="w-full h-full bg-gray-900 animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommended;
