import fetchClient from '../utils/axiosConfig';
import constants from '../utils/constants';

import { getRefreshToken }  from '../utils/storage'

export const callLoginApi = data => {
    return (_dispatch, _getState) => {
        return fetchClient.post(
            `${constants.API.LOGIN.SIGNUP}`,
            data
        );
    };
};

export const callLogoutApi = () => {
    return (_dispatch, _getState) => {
        return fetchClient.post(
            `${constants.API.LOGIN.LOGOUT}`,
            {
                refresh_token : getRefreshToken()
            }
        );
    };
};