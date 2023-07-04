import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AiFillStar, AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import FavoriteContext from "../context/FavoriteContext";
import { motion } from "framer-motion";
import axios from "axios";
import { LoadingGif } from "../assets/Index";

function SingleAnime({ theme }) {
  const PageAnimation = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,

      transition: {
        type: "spring",
      },
    },
  };

  const location = useLocation();
  const { id, type } = useParams();
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const charactersURL = `https://api.jikan.moe/v4/anime/${id}/characters`;
  const [characters, setCharacters] = useState();
  const fetchCharacters = async () => {
    setLoading(true);
    const response = await axios.get(charactersURL);
    setCharacters(response.data.data.slice(0, 20));
    setLoading(false);
  };

  const url = `https://api.jikan.moe/v4/${type}/${id}`;
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setData(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  };
  // console.log(url);

  useEffect(() => {
    setLoading(false);
    // setData(null);
    fetchData();
    if (type === "anime") {
      fetchCharacters();
    }
  }, [location, id, type]);

  if (error === true) {
    navigate("/notfound");
  }

  const [text, setText] = useState("");
  useEffect(() => {
    if (data?.about) {
      ShortenTheText();
    }
  }, [data]);

  const ChangeTextLength = () => {
    if (text.length <= 259) {
      setText(data?.about);
    } else {
      ShortenTheText();
    }
  };

  const ShortenTheText = () => {
    let description = data?.about;
    description = data?.about.substring(0, 256);
    const dots = "...";
    setText(description + dots);
  };

  const { favoriteArray, setFavoriteArray } = useContext(FavoriteContext);
  const [favorite, setFavorite] = useState(false);
  const addToFavorite = () => {
    if (favorite === false) {
      setFavorite(true);
      const newItem = {
        id: id,
        title: data?.name || data.title,
        img: data.images.jpg.image_url,
      };
      setFavoriteArray([...favoriteArray, newItem]);
    } else {
      setFavorite(false);
      const NewArray = favoriteArray.filter((item) => item.id !== id);
      setFavoriteArray(NewArray);
    }
  };

  useEffect(() => {
    setFavorite(false);
    favoriteArray.map((item) => {
      if (item.id === id) {
        setFavorite(true);
      }
    });
  }, [data]);

  return (
    <motion.div
      variants={PageAnimation}
      initial="hidden"
      animate="show"
      className="p-4"
    >
      <h1></h1>

      <>
        {loading === false && data ? (
          <>
            {type === "anime" ? ( //Anime
              <div
                className="max-w-[1240px] fixed_height mx-auto"
                style={
                  theme === "Light" ? { color: "#212121" } : { color: "white" }
                }
              >
                <div className="md:flex justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">{data?.title}</h1>
                    <div className="py-6 text-gray-400">
                      {data.score ? (
                        <div className="flex items-center">
                          <p>{data?.score}</p>
                          <p className="mx-1 text-gold">
                            <AiFillStar size={30} />
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      <p>Episodes: {data?.episodes}</p>
                      {data?.genres && (
                        <div className="flex flex-col">
                          {data?.genres.map((genre, index) => (
                            <p key={index}>{genre?.name}</p>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="font-bold col-start-2 flex items-center gap-1 cursor-pointer mb-2">
                      {favorite === false ? (
                        <>
                          <p
                            className="text-md"
                            variants={PageAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            onClick={addToFavorite}
                          >
                            Add to Favorites
                          </p>
                          <AiOutlinePlus size={30} />
                        </>
                      ) : (
                        <>
                          <p
                            className="text-md"
                            variants={PageAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            onClick={addToFavorite}
                          >
                            Added to favorites
                          </p>
                          <AiOutlineCheck
                            className="text-green-400"
                            size={30}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="md:justify-self-end">
                    <img
                      className="item_shadow"
                      src={data.images.jpg.image_url}
                      alt="Anime"
                      width="400px"
                    />
                  </div>
                </div>
                <div>
                  <div className="my-4">
                    <h1 className="text-xl">Characters</h1>
                    <div className="divider w-10 h-1 bg-primary"></div>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 justify-items-center items-end gap-4">
                    {characters
                      ? characters.map((character) => (
                          <div
                            key={character.character.name}
                            className="flex flex-col"
                            onClick={() =>
                              navigate(
                                `/singleanime/characters/${character.character.mal_id}`
                              )
                            }
                          >
                            <h1 className="text-sm">
                              {character.character.name}
                            </h1>
                            <img
                              src={character.character.images.jpg.image_url}
                              alt="Anime Character"
                            />
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
            ) : (
              //Character
              <div
                style={
                  theme === "Light" ? { color: "#212121" } : { color: "white" }
                }
                className="max-w-[1240px] fixed_height mx-auto grid justify-center sm:grid-cols-2 gap-6"
              >
                <div className="self-start row-start-2 sm:row-start-1">
                  <h1 className="text-3xl font-bold">{data.name}</h1>
                  {data?.about && (
                    <div className="text-gray-400 py-6 max-w-[400px]">
                      {text}
                      <p
                        className="cursor-pointer text-gray-400 text-md"
                        onClick={ChangeTextLength}
                      >
                        {data?.about.length > 256 && text.length == 259
                          ? "show more"
                          : ""}
                        {text.length > 259 && "show less"}
                      </p>
                    </div>
                  )}
                  <div
                    onClick={addToFavorite}
                    className="font-bold col-start-2 flex items-center justify-end gap-1 cursor-pointer"
                  >
                    {favorite === false ? (
                      <>
                        <p
                          className="text-md"
                          variants={PageAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                        >
                          Add to Favorites
                        </p>
                        <AiOutlinePlus size={30} />
                      </>
                    ) : (
                      <>
                        <p
                          className="text-md"
                          variants={PageAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                        >
                          Added to favorites
                        </p>
                        <AiOutlineCheck className="text-green-400" size={30} />
                      </>
                    )}
                  </div>
                </div>
                <div className="md:justify-self-end">
                  <img
                    className="item_shadow"
                    src={data.images.jpg.image_url}
                    alt=""
                    width="400px"
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          ""
        )}
      </>
    </motion.div>
  );
}

export default SingleAnime;
