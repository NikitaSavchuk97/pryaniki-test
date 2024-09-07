import { getData } from '../actions/getData';
import { postData } from '../actions/postData';
import { createSlice } from '@reduxjs/toolkit';
import { deleteData } from '../actions/deleteData';
import { DataSlicePropTypes } from '../../utils/types';

export const initialState: DataSlicePropTypes = {
  dataStatus: '',
  dataLoadedIn: false,
  dataCurrent: null,
  dataToEditOrRemove: null,
};

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    setThisDocument(state, action) {
      state.dataToEditOrRemove = action.payload;
    },
    setEmptyData(state) {
      state.dataCurrent = null;
      state.dataLoadedIn = false;
      state.dataStatus = '';
      state.dataToEditOrRemove = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state, action) => {
        if (state.dataStatus === 'loading' || state.dataStatus === 'success') {
          return;
        } else {
          state.dataStatus = 'loading';
        }
      })
      .addCase(getData.fulfilled, (state, action) => {
        if (action.payload.error_code === 0) {
          state.dataCurrent = action.payload.data;
          state.dataLoadedIn = true;
          state.dataStatus = 'success';
          state.dataCurrent = action.payload.data;
        } else {
          state.dataStatus = 'error';
        }
      })
      .addCase(getData.rejected, (state, action) => {
        state.dataStatus = 'error';
      })
      .addCase(postData.pending, (state, action) => {
        state.dataStatus = 'loading';
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.dataStatus = 'loading';
        if (action.payload.error_code === 0 && state.dataCurrent != null) {
          state.dataLoadedIn = true;
          state.dataStatus = 'success';
        } else {
          state.dataStatus = 'error';
        }
      })
      .addCase(postData.rejected, (state, action) => {
        state.dataStatus = 'error';
      })
      .addCase(deleteData.pending, (state, action) => {
        state.dataStatus = 'loading';
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.dataStatus = 'loading';
        if (action.payload.error_code === 0 && state.dataCurrent !== null) {
          state.dataLoadedIn = true;
          state.dataStatus = 'success';
        } else {
          state.dataStatus = 'error';
        }
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.dataStatus = 'error';
      });
  },
});

export const { setThisDocument, setEmptyData } = dataSlice.actions;
export default dataSlice.reducer;
