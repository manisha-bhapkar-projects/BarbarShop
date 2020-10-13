import fetchClient from "../utils/axiosConfig";
import constants from "../utils/constants";

export const callBookingListApi = (_page = 1, _limit = 10, _search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.BOOKINGS.LIST}`, {
      params: {
        page: _page,
        limit: _limit,
        search: _search,
      },
    });
  };
};
export const callTransactionListApi = (_page = 1, _limit = 10, _search = "") => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.TRANSACTION.LIST}`, {
      params: {
        page: _page,
        limit: _limit,
        search: _search,
      },
    });
  };
};

export const callBookingDetailsApi = (_id) => {
  return (_dispatch, _getState) => {
    return fetchClient.get(`${constants.API.BOOKINGS.EDIT_BY_ID}${_id}`);
  };
};
