import Dashboard from "../../pages/Dashboard/Dashboard";
import Serviceprovider from "../../pages/Serviceprovider/Serviceprovider";
import AboutUs from "../../pages/AboutUs/AboutUs";
import TermsAndConditions from "../../pages/TermsAndConditions/TermsAndConditions";
import constants from "../../utils/constants";
import labels from "../../utils/labels";
import Consumer from "../../pages/Consumers/Consumers";
// import AddBarber from "../../pages/Barber/AddBarber";
// import EditBarber from "../../pages/Barber/EditBarber";
// import AddUser from "../../pages/User/AddUser";
// import EditUser from "../../pages/User/EditUser";
// import Booking from "../../pages/Booking/Booking";
// import AddBooking from "../../pages/Booking/AddBooking";
// import EditBooking from "../../pages/Booking/EditBooking";
// import Appointments from "../../pages/Appoinments/Appointments";
import Services from "../../pages/Services/Services";
import EditServiceprovider from "../../pages/Serviceprovider/EditServiceprovider/EditServiceprovider";
import AddServiceprovider from "../../pages/Serviceprovider/AddServiceprovider/AddServiceprovider";
import EditConsumers from "../../pages/Consumers/EditConsumers/EditConsumers";
import AddConsumers from "../../pages/Consumers/AddConsumers/AddConsumers";
import AddServices from "../../pages/Services/AddServices/AddServices";
import Bookings from "../../pages/Bookings/Bookings";
import ContactUs from "../../pages/ContactUs/ContactUs";
import ViewBooking from "../../pages/Bookings/ViewBooking/ViewBooking";
import Transaction from "../../pages/Transaction/Transaction";
import PrivacyPolicy from "../../pages/PrivacyPolicy/PrivacyPolicy";
// import ContactList from "../../pages/ContactList/ContactList";

export const sideBarRoutes = [
  {
    path: constants.ROUTE.SIDEBAR.DASHBORD,
    component: Dashboard,
    sidebar: true,
    label: labels.SIDEBAR.DASHBORD,
    icon: "mdi mdi-monitor",
  },
  {
    path: constants.ROUTE.SIDEBAR.CONSUMER,
    component: Consumer,
    sidebar: true,
    label: labels.SIDEBAR.CONSUMER,
    icon: "mdi mdi-seat-recline-extra",
  },
  {
    path: constants.ROUTE.CONSUMER.ADD,
    component: AddConsumers,
    sidebar: false,
  },
  {
    path: constants.ROUTE.CONSUMER.EDIT,
    component: EditConsumers,
    sidebar: false,
  },
  {
    path: constants.ROUTE.SIDEBAR.SERVICE_PROVIDER,
    component: Serviceprovider,
    sidebar: true,
    label: labels.SIDEBAR.SERVICE_PROVIDER,
    icon: "mdi mdi-content-cut",
  },
  {
    path: constants.ROUTE.SERVICE_PROVIDER.ADD,
    component: AddServiceprovider,
    sidebar: false,
  },
  {
    path: constants.ROUTE.SERVICE_PROVIDER.EDIT,
    component: EditServiceprovider,
    sidebar: false,
  },
  {
    path: constants.ROUTE.SIDEBAR.BOOKING,
    component: Bookings,
    label: labels.SIDEBAR.BOOKING,
    icon: "ion-ios7-compose",
    sidebar: true,
  },
  // {
  //     path: constants.ROUTE.BOOKING.ADD,
  //     component: AddBooking,
  //     sidebar: false,
  // },
  {
    path: constants.ROUTE.BOOKING.EDIT,
    component: ViewBooking,
    sidebar: false,
  },
  {
    path: constants.ROUTE.SIDEBAR.TRANSACTION,
    component: Transaction,
    label: labels.SIDEBAR.TRANSACTION,
    icon: "mdi mdi-cash-usd", //mdi mdi-currency-usd
    sidebar: true,
  },
  // {
  //     path: constants.ROUTE.SIDEBAR.APPOINTMENTS,
  //     component: Appointments,
  //     lablel: labels.SIDEBAR.APPOINTMENTS,
  //     icon: 'ion-social-foursquare',
  //     sidebar: true,
  // },
  {
    path: constants.ROUTE.SIDEBAR.CONTACT_LIST,
    component: ContactUs,
    label: labels.SIDEBAR.CONTACT_LIST,
    icon: "ion-android-add-contact",
    sidebar: true,
  },
  {
    path: constants.ROUTE.SIDEBAR.SERVICES,
    component: Services,
    label: labels.SIDEBAR.SERVICES,
    icon: "ion-scissors",
    sidebar: true,
  },
  {
    path: constants.ROUTE.SERVICES.ADD,
    component: AddServices,
    sidebar: false,
  },
  {
    path: constants.ROUTE.SIDEBAR.TERM_AND_CONDITION,
    component: TermsAndConditions,
    icon: "ion-help-circled",
    label: labels.SIDEBAR.TERM_AND_CONDITION,
    sidebar: true,
  },
  {
    path: constants.ROUTE.SIDEBAR.PRIVACYPOLICY,
    component: PrivacyPolicy,
    icon: "mdi mdi-account-key",
    label: labels.SIDEBAR.PRIVACYPOLICY,
    sidebar: true,
  },
  {
    path: constants.ROUTE.SIDEBAR.ABOUT_US,
    component: AboutUs,
    icon: "mdi mdi-thumb-up-outline",
    label: labels.SIDEBAR.ABOUT_US,
    sidebar: true,
  },
];
