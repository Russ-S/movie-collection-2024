import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constants";

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (genre) => ({
        url: GENRE_URL,
        method: "POST",
        body: { ...genre },
      }),
    }),
    fetchGenre: builder.query({
      query: () => `${GENRE_URL}/genrelist`,
    }),
    getGenre: builder.query({
      query: ({ pageNumber }) => ({
        url: GENRE_URL,
        params: {
          pageNumber,
        },
      }),
      providesTags: ["Genre"],
      keepUnusedDataFor: 5,
    }),
    getGenreById: builder.query({
      query: (genreId) => `${GENRE_URL}/${genreId}`,
      providesTags: (result, error, genreId) => [
        { type: "Genre", id: genreId },
      ],
    }),
    getGenreDetails: builder.query({
      query: (genreId) => ({
        url: `${GENRE_URL}/${genreId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateGenre: builder.mutation({
      query: (data) => ({
        url: `${GENRE_URL}/${data.genreId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Genre"],
    }),
    deleteGenre: builder.mutation({
      query: (genreId) => ({
        url: `${GENRE_URL}/${genreId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useFetchGenreQuery,
  useGetGenreQuery,
  useGetGenreByIdQuery,
  useGetGenreDetailsQuery,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
} = genreApiSlice;
