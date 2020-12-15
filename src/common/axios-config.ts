import axios, { AxiosInstance } from "axios";
import { API_URL } from '@env'

const API: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 4500,
  headers: {
    // "Content-Type": "multipart/form-data",
    // "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
  },
});

export default API;
