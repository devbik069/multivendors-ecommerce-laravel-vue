import axios from "axios";
import { useAuth } from "@/stores";
// import { storeToRefs } from "pinia";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/v1",
});

axiosInstance.interceptors.request.use(
  function (config) {
    const authInfo = useAuth();
    // const user = storeToRefs(authInfo);
    // const auth = authInfo.user.data ? `Bearar ${authInfo.user.meta.token}` : "";
    if (authInfo.user.meta) {
      const auth = `Bearer ${authInfo.user.meta.token}`;
      config.headers['Authorization'] = auth;
    }
    config.headers["Accept"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//user auto logout

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/";
      const authInfo = useAuth();
      authInfo.$reset();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
