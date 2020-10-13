import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callConsumerListApi = (_page = 1, _limit = 10, _search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.CONSUMER.LIST}`, {
      params: {
        page: _page,
        limit: _limit,
        search: _search,
      },
    });
  };
};

export const callConsumerDetailApi = (_id) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.CONSUMER.LIST}/${_id}`);
  };
};

export const callAddConsumerApi = (_data) => {
  return (_dispatch, _getState) => {
    return fetchClient.post(`${constants.API.CONSUMER.ADD}`, _data);
  };
};

export const callUpdateConsumerDetailApi = (_data,_id) => {
  return (_dispatch, _getState) => {
    return fetchClient.put(`${constants.API.CONSUMER.ADD}/${_id}`, _data);
  };
};
