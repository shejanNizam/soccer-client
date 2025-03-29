import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TUser {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: TUser | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setCredentials: (
    //   state,
    //   action: PayloadAction<{
    //     // token: string;
    //     user: { id: string; name: string; email: string };
    //   }>
    // ) => {
    //   state.user = action.payload.user;
    //   // state.token = action.payload.token;
    // },
    setUser(state, action: PayloadAction<{ user: TUser }>) {
      state.user = action.payload.user;
      state.isLoading = false;
    },
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        user: { id: string; name: string; email: string };
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // setLogin(state, action: PayloadAction<{ user: TUser; token: string }>) {
    //   state.user = action.payload.user;
    //   state.token = action.payload.token;
    //   state.isLoading = false;
    // },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
