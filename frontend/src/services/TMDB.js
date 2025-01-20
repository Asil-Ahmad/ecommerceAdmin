import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/" }),
  endpoints: (builder) => ({
    //*GET Products list
    getProducts: builder.query({
      query: () => {
        return `product/list-products`;
      },
    }),
    //*GET Single product
    getSingleProduct: builder.query({
      query: (_id) => {
        return {
          url: `product/single-product`,
          method: "POST",
          body: { _id },
        };
      },
    }),

    // todo UI Routes
    //*GET aboutPage
    getAboutPage: builder.query({
      query: () => {
        return `aboutPage/get-aboutPage`;
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery,useGetAboutPageQuery } = tmdbApi;
