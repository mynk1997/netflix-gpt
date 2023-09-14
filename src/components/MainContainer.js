import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store?.movie?.nowPlayingMovies);
  if (!movies) return;


  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;
  return (
    <div className="w-[100%] pt-[30%] bg-black md:pt-0">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
