import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import constants from "../../utils/constants";
import labels from "../../utils/labels";
import { callConsumerListApi } from "../../actions/consumerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CardListTable from "../../components/CardListTable/CardListTable";
import View from "../../images/view3.png";
import CardHeader from "../../components/CardHeader/CardHeader";
// import StarRatings from "react-star-ratings";
import Placeholder from "../../images/placeholder.jpg";

const Consumers = (props) => {
  const [usersData, setUserData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setloading(true);
    getConsumersListData(pageNumber, limit, search);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    getConsumersListData(1, limit, e.target.value);
  };

  const handlePageChange = (perPage, page) => {
    setloading(true);
    setPageNumber(perPage);
    getConsumersListData(perPage, limit, search);
  };

  const getConsumersListData = (_page = 1, _limit = 10, _search = "") => {
    props
      .callConsumerListApiAction(_page, _limit, _search)
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

  const handleChangeLimit = (_limit) => {
    setloading(true);
    setLimit(_limit);
    getConsumersListData(1, _limit, search);
  };
  const columns = [
    {
      name: labels.CONSUMER.TABLE.COL1,
      selector: "name",
      sortable: true,
      grow: "3",
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
              // ${row.profile_pic}
              alt="user"
            />
            <p className="m-auto">{row.name}</p>
          </div>
        );
      },
    },
    {
      name: labels.CONSUMER.TABLE.COL2,
      selector: "email",
      sortable: true,
      left: true,
      grow: "3",
    },
    {
      name: labels.CONSUMER.TABLE.COL3,
      selector: "address",
      left: true,
      grow: "3",
      cell: (row) => {
        return row.address ? (
          <div style={{ overflow: "hidden" }}>{row.address}</div>
        ) : (
          <div className="m-auto" style={{ overflow: "hidden" }}>
            -
          </div>
        );
      },
    },
    {
      name: labels.CONSUMER.TABLE.COL4,
      selector: "zipcode",
      center: true,
      grow: "2  ",
      cell: (row) => {
        return (
          <div style={{ overflow: "hidden" }}>
            {row.zipcode ? row.zipcode : "-"}
          </div>
        );
      },
    },
    {
      name: labels.CONSUMER.TABLE.COL5,
      selector: "",
      left: true,
      grow: "2",
      cell: (row) => {
        return (
          <>
            {row.verified === 1 ? (
              <div className="display-status">
                <div className="inActive-status align-self-center" />
                <div className="active-status-text float-right text-nowrap">
                  Email {labels.GLOBAL.INACTIVE}
                </div>
              </div>
            ) : (
              <div className="display-status">
                <div className="active-status align-self-center" />
                <div className="active-status-text float-right text-nowrap">
                  Email {labels.GLOBAL.ACTIVE}
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
            <Link to={`${constants.ROUTE.CONSUMER.EDIT_BY_ID}${row.id}`}>
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
            title={labels.CONSUMER.TITLE}
            searchbox
            lable
            onSearchListner={handleSearch}
            createLabelName={labels.CONSUMER.ADD_CONSUMER.TITLE}
            searchText={search}
            SearchPlaceholder="Search by Name"
            handleClickCreateIcon={() => {
              history.push(constants.ROUTE.CONSUMER.ADD);
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
      callConsumerListApiAction: callConsumerListApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Consumers);
