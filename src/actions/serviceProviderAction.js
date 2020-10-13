import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callServiceProviderListApi = (
  _page = 1,
  _limit = 10,
  _search = ""
) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.SERVICE_PROVIDER.LIST}`, {
      params: {
        page: _page,
        limit: _limit,
        search: _search,
      },
    });
  };
};

export const callServiceProviderDetailApi = (_id) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.SERVICE_PROVIDER.LIST}/${_id}`);
  };
};

export const callServicesListApi = () => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.SERVICES.ALL_LIST}`);
  };
};

export const callAddServiceProviderApi = (_data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.SERVICE_PROVIDER.ADD}`, _data);
  };
};

export const callUpdateServiceProviderApi = (_data, _id) => {
  return (_dispatch, _getState) => {
    return fetchClient.put(
      `${constants.API.SERVICE_PROVIDER.LIST}/${_id}`,
      _data
    );
  };
};
