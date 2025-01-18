import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/" }),
  endpoints: (builder) => ({
    //*GET genre list
    getProducts: builder.query({
      query: () => {
        return `product/list-products`;
      },
    }),
  }),
});

export const { useGetProductsQuery } = tmdbApi;
