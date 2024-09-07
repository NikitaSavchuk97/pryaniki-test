import { instance } from '../../utils/axios';
import { getCookie } from '../../utils/getCookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { DeleteDataPropTypes, GetDataPropTypes } from '../../utils/types';

export const deleteData = createAsyncThunk<GetDataPropTypes, DeleteDataPropTypes>(
  'dataSlice/deleteData',
  async ({ idToRemove }) => {
    const { data } = await instance.delete(
      `/ru/data/v3/testmethods/docs/userdocs/delete/${idToRemove}`,
      {
        headers: {
          'x-auth': getCookie('token'),
        },
      },
    );

    return data;
  },
);
