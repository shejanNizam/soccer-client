import baseApi from "@/redux/api/baseApi/baseApi";

export const venueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // gel all
    getVenue: builder.query({
      query: () => {
        return {
          url: "/venue",
          method: "GET",
        };
      },
      providesTags: ["venue"],
    }),
    // gel by id
    getVenueById: builder.query({
      query: (id) => {
        return {
          url: `/venue/${id}`,
          method: "GET",
        };
      },
      providesTags: ["venue"],
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
      invalidatesTags: ["venue"],
    }),
  }),
});

export const {
  useGetVenueQuery,
  useGetVenueByIdQuery,
  usePostSomethingsMutation,
} = venueApi;
