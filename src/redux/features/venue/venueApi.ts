import baseApi from "@/redux/api/baseApi/baseApi";

export const venueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // gel all
    getSomethings: builder.query({
      query: () => {
        return {
          url: "/",
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    // contact us
    postSomethings: builder.mutation({
      query: (contactData) => {
        return {
          url: "/",
          method: "POST",
          body: contactData,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetSomethingsQuery, usePostSomethingsMutation } = venueApi;
