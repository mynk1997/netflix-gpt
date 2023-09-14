import { createSlice } from "@reduxjs/toolkit";

const movieSlice= createSlice({
    name:"movies",
    initialState: {
        nowPlayingMovies:null,
        popularMovies:null,
        trailerVideo:null
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies= action.payload;
        },
        addTrailerVideo:(state,action)=>{
            state.trailerVideo= action.payload;
        },
        clearTrailerVideo:(state)=>{
            state.trailerVideo= "";
        },
        addPopularMovie:(state,action)=>{
            state.popularMovies=action.payload;
        }

    }
});

export const {addNowPlayingMovies,addTrailerVideo,addPopularMovie,clearTrailerVideo} = movieSlice.actions;
export default movieSlice.reducer;