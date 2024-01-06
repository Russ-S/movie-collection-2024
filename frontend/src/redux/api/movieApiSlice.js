import { MOVIE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ keyword }) => ({
        url: `${MOVIE_URL}`,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Movies"],
    }),

    getMovieById: builder.query({
      query: (movieId) => `${MOVIE_URL}/${movieId}`,
      providesTags: (result, error, movieId) => [
        { type: "Movie", id: movieId },
      ],
    }),

    allMovies: builder.query({
      query: () => `${MOVIE_URL}/allMovies`,
    }),

    getMovieDetails: builder.query({
      query: (movieId) => ({
        url: `${MOVIE_URL}/${movieId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createMovie: builder.mutation({
      query: (movieData) => ({
        url: `${MOVIE_URL}`,
        method: "POST",
        body: movieData,
      }),
      invalidatesTags: ["Movie"],
    }),

    updateMovie: builder.mutation({
      query: ({ movieId, formData }) => ({
        url: `${MOVIE_URL}/${movieId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteMovie: builder.mutation({
      query: (movieId) => ({
        url: `${MOVIE_URL}/${movieId}`,
        method: "DELETE",
      }),
      providesTags: ["Movie"],
    }),

    getFilteredMovies: builder.query({
      query: ({ checked, radio }) => ({
        url: `${MOVIE_URL}/filtered-movies`,
        method: "POST",
        body: { checked, radio },
      }),
    }),
  }),
});

export const {
  useGetMovieByIdQuery,
  useGetMoviesQuery,
  useGetMovieDetailsQuery,
  useAllMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useGetFilteredMoviesQuery,
} = movieApiSlice;
