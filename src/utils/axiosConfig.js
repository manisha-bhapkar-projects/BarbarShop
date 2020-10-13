import axios from "axios";
import constants from "./constants";
import {
  getAuthToken,
  storeAuthToken,
  getRefreshToken,
  storeRefreshToken,
} from "./storage";
import history from "./history";
const fetchClient = () => {
  const defaultOptions = {
    baseURL: constants.BASE_URL.API,
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      const originalReq = err.config;

      if (
        err.response.status === 401 &&
        originalReq.url === `${constants.API.LOGIN.REFRESH_TOKEN}` 
      ) {
        storeAuthToken(null);
        storeRefreshToken(null)
        history.push("/");
        return Promise.reject(err);
      }

      if (
        err.response.status === 401 &&
        err.config && originalReq.url !== `${constants.API.LOGIN.SIGNUP}` && 
        originalReq.url !== `${constants.API.LOGIN.FORGOT_PASSWORD}` &&
        originalReq.url !== `${constants.API.LOGIN.SEND_OTP}` && 
        !originalReq._retry 
      ) {
        originalReq._retry = true;
        const storedRefreshToken = getRefreshToken();
        return instance
          .post(constants.API.LOGIN.REFRESH_TOKEN,
            {
              refresh_token: storedRefreshToken,
            }
          )
          .then((_res) => {
            if(_res.data.status){
              const { token, refresh_token } = _res.data.result;
              if ("refresh_token" in _res.data.result) {
                storeRefreshToken(refresh_token);
              }
              if ("token" in _res.data.result) {
                instance.defaults.headers.common.Authorization = token
                  ? `Bearer ${token}`
                  : "";
                storeAuthToken(token);
              }
              return Promise.resolve(instance(originalReq));
            }
            return Promise.reject(err);
          })
          .catch((error) => {
            if (
              error.response.status === 401 &&
              originalReq.url === constants.API.LOGIN.REFRESH_TOKEN
            ) {
              storeAuthToken(null);
              storeRefreshToken(null)
              history.push("/");
            }
            return Promise.reject(error);
          });
      }

      return Promise.reject(err);
    }
  );
  return instance;
};

export default fetchClient();
