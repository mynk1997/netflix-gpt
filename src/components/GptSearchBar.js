import React, { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openAi";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import OpenAI from "openai";

const GptSearchBar = () => {
  const [userApiKey, setUserApiKey] = useState("");
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const openai = new OpenAI({
    apiKey: userApiKey,
    dangerouslyAllowBrowser: true, // defaults to process.env["OPENAI_API_KEY"]
  });

  //search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json?.results;
  };

  const handleGptSearchClick = async () => {
    const backupMovies = "Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
    const query = searchText.current.value;
    console.log(query);
    const gptResults = await openai?.chat?.completions
      ?.create({
        messages: [{ role: "user", content: "Say this is a test" }],
        model: "gpt-3.5-turbo",
      })
      .catch((err) => setErrorMessage("GPT message:" + err.message));
    console.log(
      gptResults?.choices === undefined
        ? backupMovies
        : gptResults?.choices[0]?.message?.content
    );
  };

  const handleStandardSearch = async () => {
    const backupMovies = "Kashmir Files, Sholay, Don, Golmaal, Koi Mil Gaya";
    const movies = backupMovies.split(",");
    console.log(movies);
    const promiseArray = movies.map((movie) => searchMovieTMDB(movie));
    const tmdbData = await Promise.all(promiseArray);
    console.log(tmdbData);
    dispatch(addGptMovieResult({ movieNames: movies, movieData: tmdbData }));
  };

  const langKey = useSelector((store) => store?.config?.lang);
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className=" p-4 m-4 col-span-5"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <input
          className=" p-4 m-4 col-span-4"
          type="text"
          value={userApiKey}
          onChange={(e) => {
            setUserApiKey(e.target.value);
          }}
          placeholder={lang[langKey].gptApiKey}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey]?.search}
        </button>
        <p className="text-white col-span-9 m-4">
          {errorMessage}
          {errorMessage && (
            <button
              onClick={handleStandardSearch}
              className="text-red-500 underline"
            >
              Use standard search instead
            </button>
          )}
        </p>
      </form>
    </div>
  );
};

export default GptSearchBar;
