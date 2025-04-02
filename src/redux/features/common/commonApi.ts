import baseApi from "@/redux/api/baseApi/baseApi";

export const commonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // gel all
    getAbout: builder.query({
      query: () => {
        return {
          url: "/settings/about-us",
          method: "GET",
        };
      },
      providesTags: ["common"],
    }),
    // gel all
    getPrivacy: builder.query({
      query: () => {
        return {
          url: "/settings/privacy-policy",
          method: "GET",
        };
      },
      providesTags: ["common"],
    }),
    // gel all
    getTerms: builder.query({
      query: () => {
        return {
          url: "/settings/terms-conditions",
          method: "GET",
        };
      },
      providesTags: ["common"],
    }),
  }),
});

export const { useGetAboutQuery, useGetPrivacyQuery, useGetTermsQuery } =
  commonApi;
