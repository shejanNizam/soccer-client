import baseApi from "@/redux/api/baseApi/baseApi";

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // notifications
    allNotifications: builder.query({
      query: () => {
        return {
          url: "/notification",
          method: "GET",
        };
      },
      providesTags: ["notification"],
    }),
  }),
});

export const { useAllNotificationsQuery } = notificationsApi;
