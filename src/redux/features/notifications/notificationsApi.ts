import baseApi from "@/redux/api/baseApi/baseApi";

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all notifications
    allNotifications: builder.query({
      query: () => ({
        url: "/notification",
        method: "GET",
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
    // mark all notifications as read
    markAllRead: builder.mutation({
      query: () => ({
        url: "/notification/mark-all-read",
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useAllNotificationsQuery,
  useNotificationCountQuery,
  useMarkAllReadMutation,
} = notificationsApi;
