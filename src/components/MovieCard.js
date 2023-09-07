import React from "react";
import { POSTER_CDN } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-48 pr-4 rounded-md">
      <img alt="Movie Card" src={POSTER_CDN + posterPath}></img>
    </div>
  );
};

export default MovieCard;
