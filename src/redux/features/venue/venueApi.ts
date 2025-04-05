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
      query: ({ stateVenueId, date }) => ({
        url: "/venue-request/shift",
        method: "GET",
        params: {
          venueId: stateVenueId,
          date,
        },
      }),
      providesTags: ["venue"],
    }),

    //-----------
    //  get booked list by ID
    getSingleRequest: builder.query({
      query: (id) => {
        return {
          url: `/venue-request/${id}`,
          method: "GET",
        };
      },
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

    // add reschedule book request
    rescheduleRequest: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/venue-request/${data?.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["venue"],
    }),

    // get venue request in dashboard (approved, pending, re-schedule)
    getBookedList: builder.query({
      query: ({ page = 1, limit = 15, status, date }) => {
        return {
          url: `/venue-request`,
          method: "GET",
          params: {
            status,
            date,
            page,
            limit,
          },
        };
      },
      providesTags: ["venue"],
    }),

    //  get booked list by ID
    getBookedListById: builder.query({
      query: (id) => {
        return {
          url: `venue/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetVenueQuery,
  useGetVenueByIdQuery,
  useGetShiftQuery,
  useGetSingleRequestQuery,
  useAddBookUsingPointMutation,
  useAddBookUsingPaymentMutation,
  useRescheduleRequestMutation,
  useGetBookedListQuery,
  useGetBookedListByIdQuery,
} = venueApi;
