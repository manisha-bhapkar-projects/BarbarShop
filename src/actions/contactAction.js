import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callContactUsListApi = (_page = 1, _limit = 10, _search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.CONTACT_US.LIST}`, {
      params: {
        page: _page,
        limit: _limit,
        search: _search,
      },
    });
  };
};


