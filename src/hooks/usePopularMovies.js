import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies, addPopularMovie } from "../utils/movieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  //Fetech data from TMBD API and update store
  const dispatch = useDispatch();
  const popularMovies=useSelector(store=>store.movie.popularMovies)
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=2",
      API_OPTIONS
    );
    const json = await data.json();

    dispatch(addPopularMovie(json?.results));
  };

  useEffect(() => {
    !popularMovies && getNowPlayingMovies();
  }, []);
};

export default usePopularMovies;
