import React from "react";
import { POSTER_CDN } from "../utils/constants";
import { Link } from "react-router-dom";


const MovieCard = ({ posterPath, id }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4">
    <Link to={"/watch?id=" + id} > <img alt="Movie Card" src={POSTER_CDN + posterPath}></img></Link>
    </div>
  );
};

export default MovieCard;
