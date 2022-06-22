import axios from "axios";

const config = {
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
};

const httpClient = axios.create(config);

httpClient.interceptors.request.use((config) => {
  config.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  return config;
});

httpClient.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        const { data } = await axios.get(`http://localhost:5000/api/refresh`, {
          withCredentials: true,
        });

        localStorage.setItem("accessToken", data.accessToken);

        return httpClient.request(originalRequest);
      } catch (e) {
        console.error("Пользователь не авторизован");
      }
    }

    throw error;
  }
);

export default httpClient;
