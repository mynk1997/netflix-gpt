import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieData } = useSelector((store) => store.gpt);
  if(!movieNames) return null;
  return (
    <div lassName="p-4 m-4 bg-black text-white bg-opacity-90">
      {movieNames.map((movieName,index) => {
        return <MovieList key={movieName} title={movieName} movies={movieData[index]} />;
      })}
    </div>
  );
};

export default GptMovieSuggestions;
