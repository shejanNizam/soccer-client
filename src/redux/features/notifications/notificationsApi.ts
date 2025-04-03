import baseApi from "@/redux/api/baseApi/baseApi";

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all notifications
    allNotifications: builder.query({
      query: ({ page = 1, limit = 15 }) => ({
        url: "/notification",
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["notification"],
    }),
    // get notification count
    notificationCount: builder.query({
      query: () => ({
        url: "/notification/count",
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
  }),
});

export const { useAllNotificationsQuery, useNotificationCountQuery } =
  notificationsApi;
