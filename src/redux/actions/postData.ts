import { instance } from '../../utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetDataPropTypes, PostDataPropTypes } from '../../utils/types';
import { getCookie } from '../../utils/getCookie';

export const postData = createAsyncThunk<GetDataPropTypes, PostDataPropTypes>(
  'dataSlice/postData',
  async ({ docName, docStatus, docType, docNumber, docCompanyName }) => {
    const { data } = await instance.post(
      `/ru/data/v3/testmethods/docs/userdocs/create`,
      {
        companySigDate: new Date().toISOString(),
        companySignatureName: docCompanyName,
        documentName: docName,
        documentStatus: docStatus,
        documentType: docType,
        employeeNumber: docNumber,
        employeeSigDate: new Date().toISOString(),
        employeeSignatureName: docName,
      },
      {
        headers: {
          'x-auth': getCookie('token'),
        },
      },
    );

    return data;
  },
);
