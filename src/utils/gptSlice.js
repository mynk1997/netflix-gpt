import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch:false,
    gptMovies:null
  },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch
    },
    addGptMovieResult: (state, action) => {
      const{movieNames, movieData}=action.payload
      state.movieNames=movieNames
      state.movieData=movieData
    }
  },
});

export const {toggleGptSearchView, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;