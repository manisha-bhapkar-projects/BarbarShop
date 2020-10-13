import React, { useEffect, useState } from "react";
import { callBookingDetailsApi } from "../../../actions/bookingAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import labels from "../../../utils/labels";
import constants from "../../../utils/constants";
import { Link } from "react-router-dom";
import CardHeader from "../../../components/CardHeader/CardHeader";
import Placeholder from "../../../images/placeholder.jpg";
// import $ from "jquery";
import Loader from "react-loader-spinner";
// import Bookings from "../Bookings";

function ViewBooking(props) {
  const [booking, setBooking] = useState({});
  // const [load, setLoad] = useState(true);
  useEffect(() => {
    // $("#status").fadeOut();
    // $("#preloader").delay(350).fadeOut("slow");
    // $("body").delay(350).css({ overflow: "visible" });
    // props.match.params.id
    props
      .callBookingDetailsApiAction(props.match.params.id)
      .then((res) => {
        setBooking(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // const loadData = () => {
  //   alert('shkjsh')
  //   console.log("shdykadhsadsajkljlk",$("#status"));

  // };
  return (
    <div className="row booking-details">
      <div className="col-12 ">
        <div className="card m-b-30 custome-card">
          <div className="card-body">
            <Link
              to={constants.ROUTE.SIDEBAR.BOOKING}
              className="btn btn-success float-right mt-2"
              style={{ backgroundColor: "#e31836", borderColor: "#e31836" }}
            >
              {labels.TABLE_LABELS.BACK_BTN}
            </Link>
            <CardHeader title={labels.BOOKING.EDIT_BOOKING.TITLE} />
            {Object.keys(booking).length === 0 &&
            booking.constructor === Object ? (
              // <div className="m-auto h-100 text-center align-items-center">

              <Loader
                className="custome-loader"
                type="Circles"
                // type="Oval"
                // type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000000} //3 secs
              />
            ) : (
              // </div>
              <>
                <div className="row">
                  <div className="col-sm-6">
                    <label className={`input-label d-flex`}>
                      {labels.TABLE_LABELS.CONSUMER_NAME}
                    </label>
                    <div className="d-flex">
                      <img
                        className="booking-show-image-logo align-self-center"
                        src={
                          booking.user_profile_pic
                            ? `${constants.BASE_URL.API}/images/${booking.user_profile_pic}`
                            : Placeholder
                        }
                        alt="user"
                      />
                      <div className="align-self-center">
                        <Link
                          to={`${constants.ROUTE.SIDEBAR.CONSUMER}/${booking.customer_id}`}
                          style={{ overflow: "hidden" }}
                          className="d-flex link-over-effect"
                        >
                          <p className="my-auto">{booking.user_name}</p>
                        </Link>
                        <p className="my-auto">{booking.user_email}</p>
                        <div style={{ overflow: "hidden" }}>
                          {booking.booking_address}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label className={`input-label`}>
                      {labels.TABLE_LABELS.SERVICE_PROVIDER_NAME}
                    </label>
                    <div className="d-flex">
                      <img
                        className="booking-show-image-logo align-self-center"
                        src={
                          booking.business_profile_pic
                            ? `${constants.BASE_URL.API}/images/${booking.business_profile_pic}`
                            : Placeholder
                        }
                        alt="user"
                      />
                      <div className="align-self-center">
                        <Link
                          to={`${constants.ROUTE.SIDEBAR.SERVICE_PROVIDER}/${booking.booking_business_id}`}
                          style={{ overflow: "hidden" }}
                          className="d-flex link-over-effect"
                        >
                          <p className="my-auto">{booking.business_name}</p>
                        </Link>
                        <p className="my-auto">{booking.business_email}</p>
                        <div style={{ overflow: "hidden" }}>
                          {booking.business_address}, {booking.business_city},
                          {booking.business_state},{booking.business_zipcode}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <label className={`input-label`}>Services</label>
                    <div className="row mx-0 text-center">
                      {booking.services && booking.services.length ? (
                        booking.services.map((x) => {
                          return (
                            <div
                              className={`display-status-text-services m-1 ${
                                booking.services.length > 1 ? "mx-1" : ""
                              }`}
                            >
                              <img
                                className={`table-show-image-logo ${
                                  x.business_service_image.replace(
                                    /^.*\./,
                                    ""
                                  ) === "png"
                                    ? "services-images"
                                    : ""
                                }`}
                                src={
                                  x.business_service_image
                                    ? `${constants.BASE_URL.API}/images/${x.business_service_image}`
                                    : Placeholder
                                }
                                alt="service"
                              />
                              {x.business_service_name}
                            </div>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="col-12 my-2">
                    <label className={`input-label`}>Other</label>
                    <div className="row mx-0">
                      <div className="col-12">
                        <div
                          className={`float-right ${
                            booking.booking_status === 1
                              ? "display-status-text-pending"
                              : booking.booking_status === 2
                              ? "display-status-text-active"
                              : booking.booking_status === 3
                              ? "display-status-text-inactive"
                              : "display-status-text-active"
                          }`}
                          // onClick={() => handelStatusAction(row.service_id)}
                        >
                          {booking.booking_status === 1
                            ? labels.GLOBAL.PENDING
                            : booking.booking_status === 2
                            ? labels.GLOBAL.ACCEPT
                            : booking.booking_status === 3
                            ? labels.GLOBAL.REJECT
                            : labels.GLOBAL.COMPLETE}
                        </div>
                        Time : &nbsp; &nbsp;&nbsp; {booking.booking_date} -{" "}
                        {booking.booking_time}
                      </div>
                      <div className="col-12">
                        Rate : &nbsp; &nbsp;&nbsp; {booking.booking_rate} /
                        hours
                        {/* {`${
                          booking.booking_rate
                            ? booking.booking_rate + "  / hours"
                            : ""
                        }`} */}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 my-2">
                    {booking.bookings_images &&
                    booking.bookings_images.length ? (
                      <>
                        <label className={`input-label`}>Ref Images</label>
                        <div className="row mx-0">
                          <div className="col-md-3 col-sm-6 col-12">
                            {booking.bookings_images.map((x) => {
                              return (
                                <img
                                  src={`${constants.BASE_URL.API}/images/${x}`}
                                  alt="ref"
                                  className="ref-image m-2 ml-0 "
                                />
                              );
                            })}
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/* <div className="col-12 my-2">
                <label className={`input-label`}>Payment Method</label>
                <div className="row mx-0">
                  <div className="col-12">
                    <div className="Wrap-creadite">
                      <div className="Base">
                        <div className="Inner-wrap">
                          <div className="brand">
                            {booking.charge
                              ? booking.charge.payment_method_details.card_brand
                              : "----"}
                          </div>
                          <ul className="align-self-center">
                            <li id="first-li">XXXX</li>
                            <li>XXXX</li>
                            <li>XXXX</li>
                            <li id="last-li">
                              {booking.charge
                                ? booking.charge.payment_method_details.last4
                                : "XXXX"}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callBookingDetailsApiAction: callBookingDetailsApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(ViewBooking);
