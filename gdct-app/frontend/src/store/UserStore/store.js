import { createSlice } from '@reduxjs/toolkit';

export const UserStore = createSlice({
  name: 'USER',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    ISLOGGEDIN: (state, { payload }) => ({
      response: {
        ...state.response,
        isLoggedIn: payload.isLoggedIn,
      },
    }),
  },
});

export default UserStore;
