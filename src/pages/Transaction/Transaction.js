import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import constants from "../../utils/constants";
import labels from "../../utils/labels";
import { callTransactionListApi } from "../../actions/bookingAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CardListTable from "../../components/CardListTable/CardListTable";
import View from "../../images/view3.png";
import CardHeader from "../../components/CardHeader/CardHeader";
// import StarRatings from "react-star-ratings";
import Placeholder from "../../images/placeholder.jpg";

const Transaction = (props) => {
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
      .callTransactionListApiAction(_pageNo, _limit, _search)
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
      name: labels.TRANSACTION.TABLE.COL1,
      selector: "business_name",
      sortable: true,
      grow: "10",
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
      name: labels.TRANSACTION.TABLE.COL2,
      selector: "user_name",
      sortable: true,
      grow: "10",
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
      name: labels.TRANSACTION.TABLE.COL3,
      selector: "booking_date",
      sortable: true,
      left: true,
      grow: "3",
    },
    {
      name: labels.TRANSACTION.TABLE.COL4,
      selector: "booking_total",
      left: true,
      grow: "0.5",
      cell: (row) => {
        return <div>$ {row.booking_total}</div>;
      },
    },
    {
      name: labels.TRANSACTION.TABLE.COL5,
      selector: "booking_stripe_fee",
      left: true,
      grow: "0.5",
      cell: (row) => {
        return <div>$ {row.booking_stripe_fee}</div>;
      },
    },
    {
      name: labels.TRANSACTION.TABLE.COL6,
      selector: "booking_net_total",
      left: true,
      grow: "0.5",
      cell: (row) => {
        return <div>$ {row.booking_net_total}</div>;
      },
    },
    {
      name: labels.TRANSACTION.TABLE.COL7,
      selector: "",
      left: true,
      grow: "0.5",
      cell: (row) => {
        return (
          <div>
            $ {(row.booking_admin_fee - row.booking_stripe_fee).toFixed(2)}
          </div>
        );
      },
    },
    {
      name: labels.TRANSACTION.TABLE.COL8,
      selector: "",
      left: true,
      grow: "0.5",
      cell: (row) => {
        return (
          <div>
            $
            {(
              row.booking_net_total -
              (row.booking_admin_fee - row.booking_stripe_fee)
            ).toFixed(2)}
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
            title={labels.TRANSACTION.TITLE}
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
      callTransactionListApiAction: callTransactionListApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Transaction);
