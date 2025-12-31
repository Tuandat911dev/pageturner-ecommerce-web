import axios from "axios";
import { refreshTokenAPI } from "services/api";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // set cookie
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers["Authorization"] = "bearer " + localStorage.getItem("access_token");
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
let isRefreshing = false;
let subscribers: any[] = [];

// đẩy các request chờ vào hàng đợi
const addSubscriber = (callback: any) => {
  subscribers.push(callback);
};

// gọi lại tất cả các request đã chờ sau khi có token mới
const onRefreshed = (token: string) => {
  subscribers.map((callback) => callback(token));
  subscribers = [];
};

instance.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response?.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true; // Đánh dấu request đầu tiên
        console.log("hết hạn lần 1");

        try {
          const res = await refreshTokenAPI();
          const newAccessToken = res.data?.access_token;
          if (newAccessToken) {
            localStorage.setItem("access_token", newAccessToken);
            instance.defaults.headers.common["Authorization"] = `bearer ${newAccessToken}`;

            isRefreshing = false;
            onRefreshed(newAccessToken); // Giải phóng hàng đợi

            // call lại request đầu tiên
            originalRequest.headers["Authorization"] = `bearer ${newAccessToken}`;

            return instance(originalRequest);
          }
        } catch (refreshError) {
          isRefreshing = false;
          subscribers = []; // Xoá hàng đợi khi refresh thất bại

          // => Logout

          return Promise.reject(refreshError);
        }
      }

      // đang trong quá trình refresh, tạo một Promise để request vào hàng đợi
      const retryOriginalRequest = new Promise((resolve) => {
        addSubscriber((token: string) => {
          originalRequest.headers["Authorization"] = `bearer ${token}`;
          resolve(instance(originalRequest));
        });
      });

      return retryOriginalRequest;
    }

    return error?.response?.data ? error.response.data : Promise.reject(error);
  }
);

export default instance;
