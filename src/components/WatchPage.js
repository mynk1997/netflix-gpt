import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import VideoBackground from "./VideoBackground";

const WatchPage = () => {
  const [movieId] = useSearchParams();
  console.log(movieId.get("id"));

  return (
    <div>
      <VideoBackground movieId={movieId.get("id")} />
    </div>
  );
};

export default WatchPage;
