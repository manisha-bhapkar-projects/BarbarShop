import { getAuthToken } from "./storage";
import { toast } from "react-toastify";

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const isLogin = () => {
  const userMetaData = getAuthToken();
  if (userMetaData) {
    return true;
  }
  return false;
};

export const showSuccessToast = (data) => {
  toast.success(data, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}

export const showFailureToast = (data) => {
  toast.error(data, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    }); 
}

const utils = {
  isLogin,
  showSuccessToast,
  showFailureToast
};

export default utils;
