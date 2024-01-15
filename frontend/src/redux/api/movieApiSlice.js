import { apiSlice } from "./apiSlice";
import { MOVIES_URL } from "../constants";

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMovie: builder.mutation({
      query: (movie) => ({
        url: MOVIES_URL,
        method: "POST",
        body: { ...movie },
      }),
    }),
    fetchMovies: builder.query({
      query: () => `${MOVIES_URL}`,
    }),

    getMovies: builder.query({
      query: ({ pageNumber }) => ({
        url: MOVIES_URL,
        params: {
          pageNumber,
        },
      }),
      providesTags: ["Movies"],
      keepUnusedDataFor: 5,
    }),

    getMovieById: builder.query({
      query: (movieId) => `${MOVIES_URL}/${movieId}`,
      providesTags: (result, error, movieId) => [
        { type: "Movie", id: movieId },
      ],
    }),

    allMovies: builder.query({
      query: () => `${MOVIES_URL}/allMovies`,
    }),

    getMovieDetails: builder.query({
      query: (movieId) => ({
        url: `${MOVIES_URL}/${movieId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // createMovie: builder.mutation({
    //   query: (movieData) => ({
    //     url: `${MOVIES_URL}`,
    //     method: "POST",
    //     body: movieData,
    //   }),
    //   invalidatesTags: ["Movie"],
    // }),

    updateMovie: builder.mutation({
      query: (data) => ({
        url: `${MOVIES_URL}/${data.movieId}`,
        method: "PUT",
        body: data,
      }),
    }),
    editMovie: builder.mutation({
      query: (movie) => ({
        url: `${MOVIES_URL}/${movie.id}`,
        method: "PATCH",
        body: movie,
      }),
    }),

    deleteMovie: builder.mutation({
      query: (movieId) => ({
        url: `${MOVIES_URL}/${movieId}`,
        method: "DELETE",
      }),
      providesTags: ["Movie"],
    }),

    getFilteredMovies: builder.query({
      query: ({ checked, radio }) => ({
        url: `${MOVIES_URL}/filtered-movies`,
        method: "POST",
        body: { checked, radio },
      }),
    }),
  }),
});

export const {
  useGetMovieByIdQuery,
  useFetchMoviesQuery,
  useGetMoviesQuery,
  useGetMovieDetailsQuery,
  useAllMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useGetFilteredMoviesQuery,
  useEditMovieMutation,
} = movieApiSlice;
