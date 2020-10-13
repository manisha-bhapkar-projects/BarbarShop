import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import constants from "../../utils/constants";
import labels from "../../utils/labels";
import { callServiceProviderListApi } from "../../actions/serviceProviderAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CardListTable from "../../components/CardListTable/CardListTable";
import View from "../../images/view3.png";

import CardHeader from "../../components/CardHeader/CardHeader";
import StarRatings from "react-star-ratings";
import Placeholder from "../../images/placeholder.jpg";

const Serviceprovider = (props) => {
  const [usersData, setUserData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setloading(true);
    getServiceProviderData(pageNumber, limit, search);
  }, []);

  const getServiceProviderData = (_pageNo = 1, _limit = 10, _search = "") => {
    props
      .callServiceProviderListApiAction(_pageNo, _limit, _search)
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
    getServiceProviderData(1, limit, e.target.value);
  };

  const handlePageChange = (perPage, page) => {
    setloading(true);
    setPageNumber(perPage);
    getServiceProviderData(perPage, limit, search);
  };
  const handleChangeLimit = (_limit) => {
    setloading(true);
    setLimit(_limit);
    getServiceProviderData(1, _limit, search);
  };
  const columns = [
    {
      name: labels.SERVICE_PROVIDER.TABLE.COL1,
      selector: "name",
      sortable: true,
      grow: "2.8",
      cell: (row) => {
        return (
          <div style={{ overflow: "hidden" }} className="d-flex">
            <img
              className="table-show-image-logo align-self-center"
              src={
                row.profile_pic
                  ? `${constants.BASE_URL.API}/images/${row.profile_pic}`
                  : Placeholder
              }
              alt="user"
            />
            {/* ${row.profile_pic} */}
            <p className="m-auto">{row.name}</p>
          </div>
        );
      },
    },
    {
      name: labels.SERVICE_PROVIDER.TABLE.COL2,
      selector: "email",
      // sortable: true,
      left: true,
      grow: "2.8",
    },
    {
      name: labels.SERVICE_PROVIDER.TABLE.COL3,
      selector: "pincode",
      left: true,
      grow: "2.8",
      cell: (row) => {
        return (
          <div style={{ overflow: "hidden" }}>
            {row.address}, {row.city}, {row.state}, {row.country}, {row.zipcode}
          </div>
        );
      },
    },
    {
      name: labels.SERVICE_PROVIDER.TABLE.COL4,
      selector: "",
      center: true,
      grow: "2.5",
      cell: (row) => {
        return <div style={{ overflow: "hidden" }}>$ {row.rate}</div>;
      },
    },
    // {
    //   name: labels.SERVICE_PROVIDER.TABLE.COL5,
    //   selector: "",
    //   left: true,
    //   grow: "2.5",
    //   cell: (row) => {
    //     return (
    //       <>
    //         {row.verified === 1 ? (
    //           <div className="display-status">
    //             <div className="inActive-status align-self-center" />
    //             <div className="active-status-text float-right">Email {labels.GLOBAL.INACTIVE}</div>
    //           </div>
    //         ) : (
    //             <div className="display-status">
    //               <div className="active-status align-self-center" />
    //               <div className="active-status-text float-right">Email {labels.GLOBAL.ACTIVE}</div>
    //             </div>
    //           )}
    //       </>
    //     );
    //   },
    // },

    {
      name: labels.SERVICE_PROVIDER.TABLE.COL6,
      selector: "",
      center: true,
      grow: "2.5",
      cell: (row) => {
        return (
          <StarRatings
            rating={Number(row.rating)}
            numberOfStars={5}
            name="rating"
            starDimension="14px"
            starSpacing="1px"
          />
        );
      },
    },
    {
      name: labels.SERVICE_PROVIDER.TABLE.COL7,
      selector: "",
      left: true,
      grow: "3",
      cell: (row) => {
        return (
          <>
            {row.business_verification === 1 ? (
              <div className="display-status">
                <div className="inActive-status align-self-center" />
                <div className="active-status-text float-right text-nowrap">
                  Account {labels.GLOBAL.INACTIVE}
                </div>
              </div>
            ) : (
              <div className="display-status">
                <div className="active-status align-self-center" />
                <div className="active-status-text float-right text-nowrap">
                  Account {labels.GLOBAL.ACTIVE}
                </div>
              </div>
            )}
          </>
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
            <Link
              to={`${constants.ROUTE.SIDEBAR.SERVICE_PROVIDER}/${row.business_id}`}
            >
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
            title={labels.SERVICE_PROVIDER.TITLE}
            searchbox
            lable
            onSearchListner={handleSearch}
            createLabelName={labels.SERVICE_PROVIDER.ADD_SERVICE_PROVIDER.TITLE}
            searchText={search}
            handleClickCreateIcon={() => {
              history.push(constants.ROUTE.SERVICE_PROVIDER.ADD);
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
      callServiceProviderListApiAction: callServiceProviderListApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Serviceprovider);
