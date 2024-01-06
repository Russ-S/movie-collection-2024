import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constants";

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGenre: builder.query({
      query: (pageNumber) => ({
        url: GENRE_URL,
        params: {
          pageNumber,
        },
      }),
      providesTags: ["Genre"],
      keepUnusedDataFor: 5,
    }),
    fetchGenre: builder.query({
      query: () => `${GENRE_URL}`,
    }),
  }),
});

export const { useGetGenreQuery, useFetchGenreQuery } = genreApiSlice;
