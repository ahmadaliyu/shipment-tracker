import { LoginRequest, LoginResponse } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { authAPI } from "@/service/auth";

interface UserState extends Partial<LoginResponse> {
  user: {
    message: string;
    home_page: string;
    full_name: string;
  }; // Define user type
}

const initialState: UserState = {
  user: {
    message: "",
    home_page: "",
    full_name: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = undefined;
    },
    loadUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      authAPI.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      }
    );
  },
});

export const selectUserStore = (state: RootState) => state.user;
export const { logout, loadUser } = userSlice.actions;
export default userSlice.reducer;
