import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { GetAnime, getCharacter } from "../api/ApiCalls";
import SingleResult from "./SingleResult";
import { AnimatePresence, motion } from "framer-motion";

function SearchBar({ theme }) {
  const [showResults, setShowResults] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState();
  const resultsRef = useRef();
  const formRef = useRef();
  const handleSubmit = (e) => {
    setShowResults(true);
    e.preventDefault();
    setSearchValue(formRef?.current.children[0]?.value);
  };

  const fetchData = () => {
    const characters = axios.get(getCharacter(searchValue));
    const anime = axios.get(GetAnime(searchValue));
    axios.all([characters, anime]).then(
      axios.spread((...allData) => {
        const characters = allData[0].data.data;
        const anime = allData[1].data.data;
        setData({ characters, anime });
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, [searchValue]);

  useEffect(() => {
    let handler = (e) => {
      if (!resultsRef.current?.contains(e.target)) {
        setShowResults(false);
      }
    };
    window.addEventListener("mousedown", handler);
  });

  return (
    <div ref={resultsRef}>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex items-center text-dark"
      >
        <input
          type="text"
          placeholder="Search..."
          id="searchbar"
          name="search"
          className="outline-none p-2 bg-gray-200 max-w-[200px] md:max-w-[240px]"
        />
        <label htmlFor="searchbar">
          <AiOutlineSearch
            className="mx-1"
            onClick={handleSubmit}
            size={30}
            style={theme === "Dark" ? { color: "white" } : ""}
          />
        </label>
      </form>

      <AnimatePresence>
        {showResults && (
          <motion.div
            style={
              theme === "Dark"
                ? { background: "#212121", color: "black" }
                : { background: "white" }
            }
            className="max-h-[480px] max-w-[200px] md:max-w-[240px] absolute top-20 overflow-scroll shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {data && (
              <>
                <h1 className="px-2 border-2 border-gray-300 bg-gray-200">
                  Anime
                </h1>
                {data.anime.map((anime) => (
                  <SingleResult
                    setShowResults={setShowResults}
                    key={anime.mal_id}
                    type="anime"
                    data={anime}
                    theme={theme}
                  />
                ))}
                <h1 className="px-2 border-2 border-gray-300 bg-gray-200">
                  Characters
                </h1>
                {data.characters.map((character) => (
                  <SingleResult
                    setShowResults={setShowResults}
                    key={character.mal_id}
                    type="characters"
                    data={character}
                    theme={theme}
                  />
                ))}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;
