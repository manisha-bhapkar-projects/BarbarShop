import React, { useState, useEffect } from "react";
import labels from "../../utils/labels";
import { callDashboardApi } from "../../actions/dashboardAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import constants from "../../utils/constants";

function Dashboard(props) {
  const [usertotal, setusertotal] = useState(0);
  const [userweektotal, setuserweektotal] = useState(0);
  const [salontotal, setsalontotal] = useState(0);
  const [salonweektotal, setsalonweektotal] = useState(0);
  const [bookingtotal, setbookingtotal] = useState(0);
  const [bookingweektotal, setbookingweektotal] = useState(0);

  useEffect(() => {
    props
      .callDashboardApiAction()
      .then((response) => {
        let result = response.data.result;
        setusertotal(result.usersCount);
        setsalontotal(result.businessCount);
        setbookingtotal(result.bookingCount);
        setuserweektotal(result.usersTodaysCount);
        setsalonweektotal(result.businessTodaysCount);
        setbookingweektotal(result.bookingTodaysCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-xl-4 col-md-6">
          <Link to={constants.ROUTE.SIDEBAR.CONSUMER}>
            <div className="card mini-stat m-b-30">
              <div className="p-3 bg-primary text-white">
                <div className="mini-stat-icon">
                  <i className="mdi mdi-seat-recline-extra float-right mb-0"></i>
                </div>
                <h6 className="text-uppercase mb-0">
                  {labels.DASHBOARD.CONSUMER}
                </h6>
              </div>
              <div className="card-body">
                <div className="border-bottom pb-4">
                  <span className="badge badge-success">{/* +11% */}</span>
                </div>
                <div className="mt-4 text-muted">
                  <div className="float-right">
                    <p className="m-0">Total : {usertotal}</p>
                  </div>
                  <h5 className="m-0">
                    {userweektotal}{" "}
                    <span className="ml-2 text-muted">Today</span>
                  </h5>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-xl-4 col-md-6">
        <Link to={constants.ROUTE.SIDEBAR.SERVICE_PROVIDER}>
          <div className="card mini-stat m-b-30">
            <div className="p-3 bg-primary text-white">
              <div className="mini-stat-icon">
                <i className="mdi mdi-content-cut float-right mb-0"></i>
              </div>
              <h6 className="text-uppercase mb-0">
                {labels.DASHBOARD.SERVICE_PROVIDER}
              </h6>
            </div>
            <div className="card-body">
              <div className="border-bottom pb-4">
                <span className="badge badge-success">{/* +22% */}</span>
              </div>
              <div className="mt-4 text-muted">
                <div className="float-right">
                  <p className="m-0">Total : {salontotal}</p>
                </div>
                <h5 className="m-0">
                  {salonweektotal}
                  <span className="ml-2 text-muted">Today</span>
                </h5>
              </div>
            </div>
          </div>
          </Link>
        </div>
        <div className="col-xl-4 col-md-6">
        <Link to={constants.ROUTE.SIDEBAR.BOOKING}>
          <div className="card mini-stat m-b-30">
            <div className="p-3 bg-primary text-white">
              <div className="mini-stat-icon">
                <i className="mdi mdi-tag-text-outline float-right mb-0"></i>
              </div>
              <h6 className="text-uppercase mb-0">
                {labels.DASHBOARD.BOOKING}
              </h6>
            </div>
            <div className="card-body">
              <div className="border-bottom pb-4">
                <span className="badge badge-danger">{/* -02% */}</span>
              </div>
              <div className="mt-4 text-muted">
                <div className="float-right">
                  <p className="m-0">Total : {bookingtotal}</p>
                </div>
                <h5 className="m-0">
                  {bookingweektotal}
                  <span className="ml-2 text-muted">Today</span>
                </h5>
              </div>
            </div>
          </div>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callDashboardApiAction: callDashboardApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Dashboard);
