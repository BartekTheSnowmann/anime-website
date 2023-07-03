import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function SingleResult({ type, data, setShowResults, theme }) {
  // Navigate after click
  const navigate = useNavigate();
  const navigateToResult = (id) => {
    navigate(`/singleanime/${type}/${id}`);
    setShowResults(false);
  };

  return (
    <motion.div
      style={theme === "Dark" && { color: "white" }}
      className="p-2"
      layoutId={data.mal_id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {type === "anime" ? (
        <div
          className="flex justify-between gap-2 cursor-pointer "
          onClick={() => navigateToResult(data.mal_id)}
        >
          <div className="flex-1">
            <h1 className="text-sm md:text-md break-all">
              {data.title.length > 15
                ? data.title.slice(0, 15) + "..."
                : data.title}
            </h1>
          </div>
          <div className="flex-1">
            <img src={data.images.jpg.image_url} alt="Anime" />
          </div>
        </div>
      ) : (
        <div
          className="flex justify-between gap-2 cursor-pointer"
          onClick={() => navigateToResult(data.mal_id)}
        >
          <div className="flex-1">
            <h1 className="text-sm md:text-md">{data.name}</h1>
          </div>
          <div className="flex-1">
            <img src={data.images.jpg.image_url} alt="Anime Character" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default SingleResult;
