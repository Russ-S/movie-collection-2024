import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  media: [],
  movies: [],
  checked: [],
  radio: [],
  genreCheckboxes: {},
  checkedGenre: [],
};
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMedia: (state, action) => {
      state.media = action.payload;
    },
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
    setRadio: (state, action) => {
      state.radio = action.payload;
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
  },
});

export const { setMedia, setMovies, setChecked, setRadio, setSelectedGenre } =
  movieSlice.actions;

export default movieSlice.reducer;
