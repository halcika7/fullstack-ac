import axios from './axios.config';
import { authActions } from '../pages/auth/store/slice';
import { AppStore } from '../store/reducer';

let store: AppStore;

export const injector = (_store: AppStore) => {
  store = _store;
};

axios.interceptors.request.use(config => {
  const newConfig = { ...config };
  const Authorization = `Bearer ${store.getState().auth.token}`;
  newConfig.headers = { ...newConfig.headers, Authorization };
  return newConfig;
});

axios.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    const errorStatus = error.response.status;
    const refreshUrl = `${process.env.REACT_APP_API}/auth/refresh`;

    if (errorStatus === 401 && originalRequest.url === refreshUrl) {
      store.dispatch(authActions.resetAuth());
      throw error;
    }

    if (errorStatus === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      try {
        const res = await axios.get<{ result: { token: string } }>(
          '/auth/refresh',
          { params: { firstCheck: false } }
        );

        const { token } = res.data.result;

        if (token) {
          // dispatch refresh success
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${token}`,
          };
          store.dispatch(authActions.setToken(token));
          // return originalRequest object with Axios.
          return axios.request(originalRequest);
        }

        return store.dispatch(authActions.resetAuth());
      } catch (err) {
        store.dispatch(authActions.resetAuth());
        throw error;
      }
    }

    throw error;
  }
);
