import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import constants from "../../utils/constants";
import labels from "../../utils/labels";
import {
  callServicesListApi,
  callServicesStatusActionApi,
} from "../../actions/servicesAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CardListTable from "../../components/CardListTable/CardListTable";
// import View from "../../images/view3.png";
import CardHeader from "../../components/CardHeader/CardHeader";
// import StarRatings from "react-star-ratings";
import Placeholder from "../../images/sevicePlacehjolder.jpg";
// import { getByText } from "@testing-library/react";
import ModalComp from '../../components/Modal/Modal';

const Services = (props) => {
  const [usersData, setUserData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const [showAlertContent, setshowAlertContent] = useState(false);


  const history = useHistory();

  useEffect(() => {
    setloading(true);

    getServicesData(pageNumber, limit, search);
  }, []);
  const getServicesData = (_pageNo = 1, _limit = 10, _search = "") => {
    props
      .callServicesListApiAction(_pageNo, _limit, _search)
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
    getServicesData(1, limit, e.target.value);
  };

  const handlePageChange = (perPage, page) => {
    setloading(true);
    setPageNumber(perPage);
    getServicesData(perPage, limit, search);
  };
  const handelStatusAction = (row) => {
    props
      .callServicesStatusActionApiAction(row.service_id)
      .then((response) => {
        if (response.data.code === 200) {
          changeStatus(row.service_id);
        }
        // refresh();
        // setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const changeStatus = (_id) => {
    let data = [...usersData];
    data = data.map((x) => {
      const temp = { ...x, isdeleted: x.isdeleted === 1 ? 2 : 1 };
      return x.service_id === _id ? temp : x;
    });

    setUserData(data);
  };
  const handleChangeLimit = (_limit) => {
    setloading(true);
    setLimit(_limit);
    getServicesData(1, _limit, search);
  };
  const columns = [
    {
      name: labels.SERVICES.TABLE.COL1,
      selector: "",
      // sortable: true,
      grow: "2",
      cell: (row) => {
        return (
          <div style={{ overflow: "hidden" }}>
            {/* {console.log(row.image.replace(/^.*\./, ""))} */}
            <img
              className={`table-show-image-logo ${row.image.replace(/^.*\./, "") === "png"
                  ? "services-images"
                  : ""
                }`}
              src={
                row.image
                  ? `${constants.BASE_URL.API}/images/${row.image}`
                  : Placeholder
              }
              alt="service"
            />
          </div>
        );
      },
    },
    {
      name: labels.SERVICES.TABLE.COL2,
      selector: "name",
      sortable: true,
      left: true,
      grow: "3",
    },

    {
      name: labels.SERVICES.TABLE.COL3,
      selector: "",
      // left: true,
      grow: "2",
      cell: (row) => {
        return (
          <>
            {row.isdeleted === 2 ? (
              <div className="display-status">
                <div className="inActive-status align-self-center" />
                <div className="active-status-text float-right">InActive</div>
              </div>
            ) : (
                <div className="display-status">
                  <div className="active-status align-self-center" />
                  <div className="active-status-text float-right">Active</div>
                </div>
              )}
          </>
        );
      },
    },
    {
      name: labels.SERVICES.TABLE.COL4,
      selector: "",
      // sortable: true,
      center: true,
      grow: "2",
      cell: (row) => {
        return (
          <div
            className={`${row.isdeleted === 2
                ? "display-status-text-active"
                : "display-status-text-inactive"
              }`}
            onClick={() => {
              if (row.isdeleted === 1) {
                setshowAlert(true);
                setshowAlertContent(row);
              } else {
                handelStatusAction(row)
              }
            }}
          >
            {row.isdeleted === 2 ? "Active" : "InActive"}
          </div>
        );
      },
    },
    // {
    //   name: "",
    //   selector: "view",
    //   right: true,
    //   grow: "1",
    //   cell: (row) => {
    //     return (
    //       <div className="view-icon">
    //         <img className="table-view-icon" src={View} alt="user" />
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <div className="row">
      <div className="col-12">
        <div className="card m-b-30 custome-card">
          <CardHeader
            title={labels.SERVICES.TITLE}
            searchbox
            lable
            createLabelName={labels.SERVICES.ADD_SERVICE.TITLE}
            handleClickCreateIcon={() =>
              history.push(constants.ROUTE.SERVICES.ADD)
            }
            onSearchListner={handleSearch}
            searchText={search}
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
      <ModalComp title="Alert" 
      show={showAlert}
      onCancelClick={() => {
        setshowAlert(false)
        setshowAlertContent(null)
      }}
      onContinueClick={() => {
        handelStatusAction(showAlertContent)
        setshowAlert(false);
        setshowAlertContent(false);
      }}
      body="On Inactive Service action, service if listed in service provider profile will also get inactive. Do you still want to Continue ?"/>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callServicesListApiAction: callServicesListApi,
      callServicesStatusActionApiAction: callServicesStatusActionApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Services);
