const API_URL = "http://34.202.173.112/hairforceuno/api/v1";

export default {
  BASE_URL: {
    API: `${API_URL}`,
  },
  API: {
    LOGIN: {
      SIGNUP: "/admin/auth/login",
      LOGOUT: "/admin/auth/logout",
      REFRESH_TOKEN: "/admin/auth/token",
      SEND_OTP: "/admin/auth/forgetpass/sentotp",
      FORGOT_PASSWORD: "/admin/auth/forgetpass",
    },
    FILE_UPLOAD: {
      UPLOAD: "/common/upload",
    },
    SERVICE_PROVIDER: {
      LIST: "/admin/business",
      ADD: "/admin/business",
      EDIT: "",
    },
    CONSUMER: {
      LIST: "/admin/user",
      ADD: "/admin/user",
      EDIT: "",
    },
    SERVICES: {
      LIST: "/admin/services",
      ALL_LIST: "/common/services",
      ADD: "/admin/services",
      EDIT: "",
    },
    ABOUT_US: {
      API: "/admin/common/aboutus",
    },
    TERM_AND_CONDITION: {
      API: "/admin/common/tc",
    },
    PRIVACYPOLICY: {
      API: "/admin/common/pp",
    },
    BOOKINGS: {
      LIST: "/admin/booking",
      ADD: "",
      EDIT: "",
      EDIT_BY_ID: "/admin/booking/details/",
    },
    TRANSACTION: {
      LIST: "/admin/booking/transaction",
    },
    CONTACT_US: {
      LIST: "/admin/common/contactus",
    },
    DASHBOARD: "/admin/common/dashboard",
  },
  STORAGE: {
    AUTH: {
      TOKEN: "auth-token",
      REF_TOKEN: "refresh-token",
      ADMIN_DATA: "admin-data",
    },
  },
  ROUTE: {
    LOGIN: {
      SIGNUP: "/",
      FORGOT_PASSWORD: "/forgotpassword",
      CHANGE_PASSWORD: "/changepassword",
    },
    SIDEBAR: {
      DASHBORD: "/dashboard",
      CONSUMER: "/consumer",
      SERVICE_PROVIDER: "/services-provider",
      BOOKING: "/booking",
      TRANSACTION: "/transaction",
      APPOINTMENTS: "/appointments",
      SERVICES: "/services",
      ABOUT_US: "/about-us",
      TERM_AND_CONDITION: "/term-and-condition",
      PRIVACYPOLICY:'/privacy-policy',
      CONTACT_LIST: "/contact-list",
    },
    SERVICE_PROVIDER: {
      ADD: "/services-provider/add-new-services-provider",
      EDIT: "/services-provider/:id",
    },
    CONSUMER: {
      ADD: "/consumer/add-new-consumer",
      EDIT: "/consumer/:id",
      EDIT_BY_ID: "/consumer/",
    },
    BOOKING: {
      ADD: "/booking/add-new-booking",
      EDIT: "/booking/:id",
      EDIT_BY_ID: "/booking/",
    },
    APPOINTMENTS: {
      ADD: "/appointments/add-new-appointments",
      EDIT: "/appointments/:id",
    },
    SERVICES: {
      ADD: "/services/add-new-services",
      EDIT: "/services/:id",
    },
  },
};
