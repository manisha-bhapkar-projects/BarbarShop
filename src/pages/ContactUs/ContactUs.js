import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import constants from "../../utils/constants";
import labels from "../../utils/labels";
import { Modal } from "react-bootstrap";
import { callContactUsListApi } from "../../actions/contactAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CardListTable from "../../components/CardListTable/CardListTable";
// import View from "../../images/view3.png";
import CardHeader from "../../components/CardHeader/CardHeader";
import Placeholder from "../../images/placeholder.jpg";

const Booking = (props) => {
  const [usersData, setUserData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [show, setShow] = useState(false);
  const [showTitle, setTitle] = useState("");
  const [showDescription, setDescription] = useState("");

  // const history = useHistory();

  useEffect(() => {
    setloading(true);
    getContactUsList(pageNumber, limit, search);
  }, []);
  const getContactUsList = (_pageNo = 1, _limit = 10, _search = "") => {
    props
      .callContactUsListApiAction(_pageNo, _limit, _search)
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
    getContactUsList(1, limit, e.target.value);
  };

  const handlePageChange = (perPage, page) => {
    setloading(true);
    setPageNumber(perPage);
    getContactUsList(perPage, limit, search);
  };
  const handleDisplayDesc = (_name, _email, _title, _desc) => {
    // console.log(_name, _email, _title, _desc);
    setTitle(_title);
    setDescription(_desc);
    setShow(true);
  };
  const handleChangeLimit = (_limit) => {
    setloading(true);
    setLimit(_limit);
    getContactUsList(1, _limit, search);
  };
  const columns = [
    {
      name: labels.CONTACT_LIST.TABLE.COL1,
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
              // ${row.business_profile_pic}
              alt="user"
            />
            <p className="m-auto">{row.name}</p>
          </div>
        );
      },
    },
    {
      name: labels.CONTACT_LIST.TABLE.COL2,
      selector: "email",
      sortable: true,
      grow: "3",
      cell: (row) => {
        return (
          <div style={{ overflow: "hidden" }} className="d-flex">
            <p className="m-auto">{row.email}</p>
          </div>
        );
      },
    },

    {
      name: labels.CONTACT_LIST.TABLE.COL3,
      selector: "roll",
      center: true,
      grow: "3",
      cell: (row) => {
        return (
          <div className="row text-center">
            {row.role === 1 ? "Consumer" : "Service Provider"}
          </div>
        );
      },
    },
    {
      name: labels.CONTACT_LIST.TABLE.COL4,
      selector: "title",
      sortable: true,
      left: true,
      grow: "3",
    },
    {
      name: labels.CONTACT_LIST.TABLE.COL5,
      selector: "description",
      sortable: true,
      left: true,
      grow: "3",
      cell: (row) => {
        return (
          <div
            className="overflow-ellipsis pointer"
            onClick={() =>
              handleDisplayDesc(row.name, row.email, row.title, row.description)
            }
          >
            {row.description}
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
            title="HairforceUno Contact US Forms List"
            searchbox
            lable={false}
            onSearchListner={handleSearch}
            // createLabelName={labels.CONTACT_LIST.ADD_BOOKING.TITLE}
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
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{showTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="display-desc">{showDescription}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callContactUsListApiAction: callContactUsListApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Booking);
