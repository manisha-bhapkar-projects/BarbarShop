import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import constants from "../../utils/constants";
import labels from "../../utils/labels";
import { callBookingListApi } from "../../actions/bookingAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CardListTable from "../../components/CardListTable/CardListTable";
import View from "../../images/view3.png";
import CardHeader from "../../components/CardHeader/CardHeader";
// import StarRatings from "react-star-ratings";
import Placeholder from "../../images/placeholder.jpg";

const Booking = (props) => {
  const [usersData, setUserData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);
  // const history = useHistory();

  useEffect(() => {
    setloading(true);
    getBookingData(pageNumber, limit, search);
  }, []);

  const getBookingData = (_pageNo = 1, _limit = 10, _search = "") => {
    props
      .callBookingListApiAction(_pageNo, _limit, _search)
      .then((response) => {
        if (Array.isArray(response.data.result)) {
          setCount(0);
          setUserData([]);
        } else {
          setCount(response.data.result.count);
          setUserData(response.data.result.data);
        }
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    getBookingData(1, limit, e.target.value);
  };

  const handlePageChange = (perPage, page) => {
    setloading(true);
    setPageNumber(perPage);
    getBookingData(perPage, limit, search);
  };
  const handleChangeLimit = (_limit) => {
    setloading(true);
    setLimit(_limit);
    getBookingData(1, _limit, search);
  };
  const columns = [
    {
      name: labels.BOOKING.TABLE.COL1,
      selector: "business_name",
      sortable: true,
      grow: "3",
      cell: (row) => {
        return (
          <Link
            to={`${constants.ROUTE.SIDEBAR.SERVICE_PROVIDER}/${row.booking_business_id}`}
            style={{ overflow: "hidden" }}
            className="d-flex link-over-effect"
          >
            <img
              className="table-show-image-logo align-self-center"
              src={
                row.business_profile_pic
                  ? `${constants.BASE_URL.API}/images/${row.business_profile_pic}`
                  : Placeholder
              }
              // ${row.business_profile_pic}
              alt="user"
            />
            <p className="m-auto">{row.business_name}</p>
          </Link>
        );
      },
    },
    {
      name: labels.BOOKING.TABLE.COL2,
      selector: "user_name",
      sortable: true,
      grow: "3",
      cell: (row) => {
        return (
          <Link
            to={`${constants.ROUTE.CONSUMER.EDIT_BY_ID}${row.customer_id}`}
            style={{ overflow: "hidden" }}
            className="d-flex link-over-effect"
          >
            <img
              className="table-show-image-logo align-self-center"
              src={
                row.user_profile_pic
                  ? `${constants.BASE_URL.API}/images/${row.user_profile_pic}`
                  : Placeholder
              }
              // ${row.user_profile_pic}
              alt="user"
            />
            <p className="m-auto">{row.user_name}</p>
          </Link>
        );
      },
    },

    {
      name: labels.BOOKING.TABLE.COL3,
      selector: "address",
      center: true,
      grow: "3.5",
      cell: (row) => {
        return (
          <div className="row text-center">
            {row.services.map((x) => {
              return (
                <div
                  className={`display-status-text-services m-1 ${
                    row.services.length > 1 ? "mx-1" : ""
                  }`}
                >
                  {x.business_service_name}
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      name: labels.BOOKING.TABLE.COL4,
      selector: "booking_date",
      sortable: true,
      left: true,
      grow: "3",
    },
    {
      name: labels.BOOKING.TABLE.COL5,
      selector: "",
      left: true,
      grow: "2",
      cell: (row) => {
        if (row.booking_status === 1) {
          return (
            <div className="display-status">
              <div className="pending-status align-self-center" />
              <div className="active-status-text float-right text-nowrap">
                {labels.GLOBAL.PENDING}
              </div>
            </div>
          );
        } else if (row.booking_status === 2) {
          return (
            <div className="display-status">
              <div className="active-status align-self-center" />
              <div className="active-status-text float-right text-nowrap">
                {labels.GLOBAL.ACCEPT}
              </div>
            </div>
          );
        } else if (row.booking_status === 3) {
          return (
            <div className="display-status">
              <div className="inActive-status align-self-center" />
              <div className="active-status-text float-right text-nowrap">
                {labels.GLOBAL.REJECT}
              </div>
            </div>
          );
        }
        return (
          <div className="display-status">
            <div className="active-status align-self-center" />
            <div className="active-status-text float-right text-nowrap">
              {labels.GLOBAL.COMPLETE}
            </div>
          </div>
        );
      },
    },
    {
      name: "",
      selector: "view",
      right: true,
      grow: "1",
      cell: (row) => {
        return (
          <div className="view-icon">
            <Link to={`${constants.ROUTE.BOOKING.EDIT_BY_ID}${row.booking_id}`}>
              <img className="table-view-icon" src={View} alt="user" />
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="row">
      <div className="col-12">
        <div className="card m-b-30 custome-card">
          <CardHeader
            title={labels.BOOKING.TITLE}
            searchbox
            // lable
            onSearchListner={handleSearch}
            createLabelName={labels.BOOKING.ADD_BOOKING.TITLE}
            searchText={search}
            handleClickCreateIcon={() => {
              //   history.push(constants.ROUTE.CONSUMER.ADD);
            }}
          />
          <React.Fragment>
            <CardListTable
              data={usersData}
              columns={columns}
              pending={loading}
              pagination
              paginationServer
              noDataString={"No data found"}
              totalListCount={count}
              paginationTotalRows={count}
              paginationPerPage={limit}
              handlePageChange={handlePageChange}
              onChangeLimit={handleChangeLimit}
            />
          </React.Fragment>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callBookingListApiAction: callBookingListApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Booking);
