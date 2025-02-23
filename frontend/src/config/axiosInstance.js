import axios from "axios";

// Set baseURL
axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;
let language = "en";
// Set default headers
axios.defaults.headers.common = {
  // Authorization: "Bearer " + token,
  Accept: "application/json, application/octet-stream",
  'ngrok-skip-browser-warning': 'true',
  locale: language,
};
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Perform operation according error code. for example, toast notification, logout, etc.
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      window.location.href = "/login"
      return error;
    }
    return Promise.reject(error);
  }
);

export default axios;