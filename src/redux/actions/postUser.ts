import { instance } from '../../utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostUserDataPropTypes, PostUserValuesPropTypes } from '../../utils/types';
import { setCookie } from '../../utils/setCookie';

export const postUser = createAsyncThunk<
  PostUserDataPropTypes,
  PostUserValuesPropTypes
>('userSlice/postUser', async ({ loginValue, passValue }) => {
  const { data } = await instance.post(`/ru/data/v3/testmethods/docs/login`, {
    username: loginValue,
    password: passValue,
  });
  setCookie('token', data.data.token);

  return data;
});
