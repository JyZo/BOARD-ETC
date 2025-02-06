import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

Axios.interceptors.request.use(
  async (config) => {
    console.log("intercepter request", config);
    const accessToken = localStorage.getItem("accesstoken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log("accessToken", accessToken);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    console.log("response", response);
    return response;
  },
  async (error) => {
    console.log("intercepter err");
    let originRequest = error.config;

    if (error.response.status === 401 && !originRequest.retry) {
      originRequest.retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      console.log("refereshtoken", refreshToken);

      if (refreshToken) {
        console.log("refresh2", refreshToken);
        const newAccessToken = await refreshAccessToken(refreshToken);
        console.log("newAccessToken", newAccessToken);

        if (newAccessToken) {
          console.log("newAccessToken2", newAccessToken);
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originRequest);
        }
      }
    }

    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await Axios({
      url: "/api/user/refresh-token",
      method: "post",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    console.log("refrehs response", response);
    const accessToken = response.data.data.accessToken;
    console.log("accesstoken response", response);
    localStorage.setItem("accesstoken", accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

export default Axios;
