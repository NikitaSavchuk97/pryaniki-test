import { createSlice } from '@reduxjs/toolkit';
import { UserSlicePropTypes } from '../../utils/types';
import { postUser } from '../actions/postUser';
import { removeCookie } from '../../utils/removeCookie';

export const initialState: UserSlicePropTypes = {
  userStatus: '',
  userLoggedIn: false,
  userCurrent: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userLoggedIn = true;
      state.userCurrent = {
        name: action.payload.name,
        email: action.payload.email,
      };
    },
    logoutUser(state) {
      removeCookie('token');
      state.userLoggedIn = false;
      state.userCurrent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUser.pending, (state) => {
        state.userStatus = 'loading';
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.userStatus = 'success';
        state.userLoggedIn = true;
        state.userCurrent = {
          name: action.meta.arg.loginValue,
          email: `${action.meta.arg.loginValue}@pryaniki.ru`,
        };
      })
      .addCase(postUser.rejected, (state, action) => {
        state.userStatus = 'error';
      });
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
