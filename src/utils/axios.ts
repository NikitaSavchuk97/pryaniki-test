import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://test.v5.pryaniky.com',
  timeout: 30000,
});
