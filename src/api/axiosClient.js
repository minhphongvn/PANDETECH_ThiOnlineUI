import axios from "axios";

const instance = axios.create({
  baseURL: "http://lhuexamonline.herokuapp.com",
  // baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// instance.interceptors.request.use(async (config) => {
//   // handle token
//   return config
// })

instance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default instance;
