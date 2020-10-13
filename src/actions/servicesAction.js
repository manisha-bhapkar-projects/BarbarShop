import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callServicesListApi = (_page = 1, _limit = 10, _search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.SERVICES.LIST}`, {
      params: {
        page: _page,
        limit: _limit,
        search: _search,
      },
    });
  };
};

export const callServicesStatusActionApi = (_id) => {
  return (_dispatch, _getState) => {
    return fetchClient.delete(`${constants.API.SERVICES.LIST}/${_id}`);
  };
};

export const callAddServicesApi = (_data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.SERVICES.ADD}`,_data);
  };
};

