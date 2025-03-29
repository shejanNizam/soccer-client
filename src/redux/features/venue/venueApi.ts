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

    // get schedule
    getShift: builder.query({
      query: ({ venueId, date }) => ({
        url: "/venue-request/shift",
        method: "GET",
        params: {
          venueId,
          date,
        },
      }),
      providesTags: ["venue"],
    }),

    // add book request using point
    addBookUsingPoint: builder.mutation({
      query: (pointData) => {
        return {
          url: "/venue-request/with-points",
          method: "POST",
          body: pointData,
        };
      },
      invalidatesTags: ["venue"],
    }),
    // add book request using payment
    addBookUsingPayment: builder.mutation({
      query: (paymentData) => {
        return {
          url: "/checkout",
          method: "POST",
          body: paymentData,
        };
      },
      invalidatesTags: ["venue"],
    }),
  }),
});

export const {
  useGetVenueQuery,
  useGetVenueByIdQuery,
  useGetShiftQuery,
  useAddBookUsingPointMutation,
  useAddBookUsingPaymentMutation,
} = venueApi;
