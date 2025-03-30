import baseApi from "@/redux/api/baseApi/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // gel all Wallet
    getWallet: builder.query({
      query: ({ paymentType, page = 1, limit = 15 }) => {
        return {
          url: "/transaction/my-transaction",
          method: "GET",
          params: {
            paymentType,
            page,
            limit,
          },
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

export const { useGetWalletQuery, usePostSomethingsMutation } = walletApi;
