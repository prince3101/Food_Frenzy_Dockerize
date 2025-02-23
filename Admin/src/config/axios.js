import axios from "axios";
let token = localStorage.getItem("jwtToken");
// Set baseURL
axios.defaults.baseURL = `${process.env.REACT_APP_BASEURL}`;
let language = "en";
// Set default headers
axios.defaults.headers.common = {
  Authorization: "Bearer " + token,
  Accept: "application/json, application/octet-stream",
  'ngrok-skip-browser-warning': 'true',
  locale: language,
};
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Perform operation according error code. for example, toast notification, logout, etc.
    if (error.response.status === 401) {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userData");
      window.location.href = "/"
      return error;
    }
    return Promise.reject(error);
  }
);

export default axios;
