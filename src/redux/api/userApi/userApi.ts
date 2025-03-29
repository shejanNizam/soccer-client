import baseApi from "../baseApi/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 01. get user data api endpoint
    getUserData: builder.query({
      query: () => {
        return {
          url: "/user/profile",
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    // 02. update user data api endpoint
    updateUserData: builder.mutation({
      query: (userData) => {
        return {
          url: "/user/profile",
          // url: "/user/update-profile",
          method: "PUT",
          body: userData,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetUserDataQuery, useUpdateUserDataMutation } = userApi;
