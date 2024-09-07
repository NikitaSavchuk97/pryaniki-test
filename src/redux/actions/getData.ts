import { instance } from '../../utils/axios';
import { getCookie } from '../../utils/getCookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetDataPropTypes } from '../../utils/types';

export const getData = createAsyncThunk<GetDataPropTypes>('dataSlice/getData', async () => {
  const { data } = await instance.get('/ru/data/v3/testmethods/docs/userdocs/get', {
    headers: {
      'x-auth': getCookie('token'),
    },
  });

  return data;
});
