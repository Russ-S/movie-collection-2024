import { apiSlice } from "./apiSlice";
import { MEDIA_URL } from "../constants";

export const mediaApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchMedia: builder.query({
      query: () => `${MEDIA_URL}`,
    }),
  }),
});

export const { useFetchMediaQuery } = mediaApiSlice;
