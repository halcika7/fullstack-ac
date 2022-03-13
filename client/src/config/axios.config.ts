import { Axios } from 'axios';

const url = process.env.REACT_APP_API;

const axios = new Axios({ baseURL: url, withCredentials: true });

axios.interceptors.request.use(config => {
  const newConfig = { ...config };
  //   const Authorization = `Bearer ${store.getState().auth.token}`;
  newConfig.headers = {
    ...newConfig.headers,
    //   Authorization,
  };
  return newConfig;
});

axios.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    const errorStatus = error.response.status;
    const refreshUrl = `${url}/auth/refresh`;

    if (errorStatus === 401 && originalRequest.url === refreshUrl) {
      //   store.dispatch(logoutUser);
      //   store.dispatch(authReset());
      return error;
    }

    if (errorStatus === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      try {
        const res = await axios.get<{ accessToken: string }>('/auth/refresh', {
          params: { firstCheck: false },
        });

        const { accessToken } = res.data;
        // dispatch refresh success
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };
        //   store.dispatch(authSuccess(accessToken));
        // return originalRequest object with Axios.
        return axios.request(originalRequest);
      } catch (err) {
        // store.dispatch(logoutUser);
        // store.dispatch(authReset());
        return err;
      }
    }

    return error;
  }
);

export default axios;
