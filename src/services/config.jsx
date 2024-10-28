// config.js
import Axios from "axios";
import { store } from "..";
import { turnOffLoading, turnOnLoading } from "../redux/spinnerSlice";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3MSIsIkhldEhhblN0cmluZyI6IjE0LzAzLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0MTkxMDQwMDAwMCIsIm5iZiI6MTcxNDA2NDQwMCwiZXhwIjoxNzQyMDU4MDAwfQ.aL6UU86iw9qfiazPYi9hHV3FjYthitqZbK5pBfChSiU";
const baseUrl = "https://movienew.cybersoft.edu.vn";

const configData = (method, url, data) => {
  return Axios({
    method: method,
    url: `${baseUrl}${url}`,
    data: data,
    headers: { TokenCybersoft: token },
  });
};

export default configData;

//********************************************* */
export let http = Axios.create({
  baseURL: baseUrl,
  headers: {
    TokenCybersoft: token,
    Authorization:
      "bearer " + JSON.parse(localStorage.getItem("USER_LOGIN"))?.accessToken,
  },
});

// AXIOS INTERCEPTOR

// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log("request đi");
    store.dispatch(turnOnLoading());
    return config;
  },
  function (error) {
    // Do something with request error
    store.dispatch(turnOffLoading());
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("request về");
    store.dispatch(turnOffLoading());
    return response;
  },
  function (error) {
    store.dispatch(turnOffLoading());
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
