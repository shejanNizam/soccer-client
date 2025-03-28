import baseApi from "../baseApi/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 01. signup api endpoint
    signup: builder.mutation({
      query: (userData) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: userData,
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 02. login api endpoint
    login: builder.mutation({
      query: (credentials) => {
        return {
          url: "/user/login",
          method: "POST",
          body: credentials,
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 03. forget password api endpoint
    forgetPassword: builder.mutation({
      query: (email) => {
        return {
          url: "/user/forget-password",
          method: "POST",
          body: email,
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 04. verify forget otp api endpoint
    verifyForgetOtp: builder.mutation({
      query: ({ otp }) => {
        return {
          url: `/auth/verify-email`,
          method: "POST",
          body: { otp: otp },
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 05. resend otp api endpoint
    resendOtp: builder.mutation({
      query: (email) => {
        return {
          url: `/user/resend?email=${encodeURIComponent(email)}`,
          method: "POST",
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 06. reset password api endpoint
    resetPassword: builder.mutation({
      query: ({ password }) => {
        return {
          url: "/user/reset-password",
          method: "POST",
          body: password,
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 07. verify email api endpoint
    verifyEmail: builder.mutation({
      query: (email) => {
        return {
          url: `/user/verify-email?email=${encodeURIComponent(email)}`,
          method: "POST",
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 08. verify otp api endpoint
    changePassword: builder.mutation({
      query: (body) => {
        return {
          url: "/user/change-password",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 09. logout api endpoint
    logout: builder.mutation({
      query: () => {
        return {
          url: "/logout",
          method: "POST",
        };
      },
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useSignupMutation, // 01
  useLoginMutation, // 02
  useForgetPasswordMutation, // 03
  useVerifyForgetOtpMutation, // 04
  useResendOtpMutation, // 05
  useResetPasswordMutation, // 06
  useVerifyEmailMutation, // 07
  useChangePasswordMutation, // 08
  useLogoutMutation, // 09
} = authApi;
