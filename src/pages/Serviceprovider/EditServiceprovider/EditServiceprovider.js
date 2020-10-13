import React, { useEffect, useState } from "react";
import {
  callServiceProviderDetailApi,
  callServicesListApi,
  callUpdateServiceProviderApi,
} from "../../../actions/serviceProviderAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "rc-time-picker/assets/index.css";
// import moment from "moment";
import TextFieldComponent from "../../../components/TextFieldComponent/TextFieldComponent";
import TextAreaComponent from "../../../components/TextAreaComponent/TextAreaComponent";
import TimePickerForAllDays from "../../../components/TimePickerForAllDays/TimePickerForAllDays";
import DropdownComponentWithMultiSelect from "../../../components/DropdownSearch/DropdownComponentWithMultiSelect";
import { useHistory, Link } from "react-router-dom";
import labels from "../../../utils/labels";
import constants from "../../../utils/constants";
import { barberTimeData } from "../../../utils/DemoData";
import CardHeader from "../../../components/CardHeader/CardHeader";
// import Placeholder from "../../../images/Abc.jpg";
// import Switch from "../../../components/Switch/Switch";
import { toast } from "react-toastify";
import { validationNameWithRegex } from "../../../utils/validation";
import Loader from "react-loader-spinner";
import ImageLoader from "../../../components/ImageLoader/ImageLoader";

// const format = "hh:mm a";

function EditServiceprovider(props) {
  const [barber, setBarberDetail] = useState({});
  const [services, setServices] = useState([]);
  const [constServices, setConstServices] = useState([]);
  // const [edit, setEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isError, setIsError] = useState(false);

  const history = useHistory();
  useEffect(() => {
    props
      .callServicesListApiAction()
      .then((res) => {
        if (res.data.status) {
          setServices(
            res.data.result.map((x) => {
              return {
                label: x.name,
                value: x.service_id,
                id: x.service_id,
              };
            })
          );
          setConstServices(res.data.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    props
      .callServiceProviderDetailApiAction(props.match.params.id)
      .then((res) => {
        if (res.data.status) {
          const temp = {
            ...res.data.result[0],
            availability:
              res.data.result[0].availability &&
              res.data.result[0].availability.length
                ? res.data.result[0].availability.map((x, index) => {
                    return { 
                      ...x, 
                      start_time : x.start_time == null ? "00:00" : x.start_time,
                      end_time : x.end_time == null ? "00:00" : x.end_time,
                      id: index 
                    };
                  })
                : barberTimeData,
          };
          setBarberDetail(temp);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEndTime = (value, id) => {
    setIsEdit(true);
    // console.log(value, id);
    if (barber) {
      const data = { ...barber };
      const Index = data.availability.findIndex((x) => x.id === id);
      data.availability[Index].end_time = value.format("hh:mm a");

      setBarberDetail(data);
    }
  };
  const handleStartTime = (value, id) => {
    setIsEdit(true);

    if (barber) {
      const data = { ...barber };
      const Index = data.availability.findIndex((x) => x.id === id);
      data.availability[Index].start_time = value.format("hh:mm a");
      setBarberDetail(data);
    }
  };
  const handleCheck = (id) => {
    setIsEdit(true);

    if (barber) {
      const data = { ...barber };
      const Index = data.availability.findIndex((x) => x.id === id);
      data.availability[Index].select = !data.availability[Index].select;

      // data.availability[Index].end_time = value.format("hh:mm a");
      setBarberDetail(data);
    }
  };

  const handleServices = (selectedServices) => {
    setIsEdit(true);

    const new_service = selectedServices.map((x) => parseInt(x.id));
    const data = { ...barber };
    if (barber) {
      const tempServices = constServices.filter((x) =>
        new_service.includes(x.service_id)
      );
      data.services = tempServices.map((x) => {
        return { ...x, business_service_name: x.name };
      });
      // selectedServices.filter((new) => (new.id === x.service_id));
      // data.availability[Index].end_time = value.format("hh:mm a");
    }
    setBarberDetail(data);
  };

  const handlechangeAbout = (e) => {
    setIsEdit(true);

    const data = { ...barber };
    if (barber) {
      data.about_us = e.target.value;
    }
    setBarberDetail(data);
  };

  const handleChangeName = (e) => {
    setIsEdit(true);

    const data = { ...barber };
    if (barber) {
      data.name = e.target.value;
    }
    setBarberDetail(data);
  };
  const handleChangeEmail = (e) => {
    setIsEdit(true);

    const data = { ...barber };
    if (barber) {
      data.email = e.target.value;
    }
    setBarberDetail(data);
  };
  const handleChangeAddress = (e) => {
    setIsEdit(true);

    const data = { ...barber };
    if (barber) {
      data.address = e.target.value;
    }
    setBarberDetail(data);
  };

  const handleChangeZipcode = (e) => {
    setIsEdit(true);

    const data = { ...barber };
    if (barber) {
      if (
        (e.target.value === "" ||
          validationNameWithRegex(
            e.target.value,
            labels.REGEX_PATTERN.NUMBER
          )) &&
        e.target.value.length <= 5
      ) {
        data.zipcode = e.target.value;
      }
    }
    setBarberDetail(data);
  };

  const handleChangeRate = (e) => {
    setIsEdit(true);

    const data = { ...barber };
    if (barber) {
      if (
        e.target.value === "" ||
        validationNameWithRegex(e.target.value, labels.REGEX_PATTERN.NUMBER)
      ) {
        data.rate = e.target.value;
      }
    }
    setBarberDetail(data);
  };

  const handleState = (e) => {
    setIsEdit(true);

    const data = { ...barber };
    if (barber) {
      data.state = e.target.value;
    }
    setBarberDetail(data);
  };

  const handleCountry = (e) => {
    setIsEdit(true);

    const data = { ...barber };
    if (barber) {
      data.country = e.target.value;
    }
    setBarberDetail(data);
  };

  const handleCity = (e) => {
    setIsEdit(true);

    const data = { ...barber };
    if (barber) {
      data.city = e.target.value;
    }
    setBarberDetail(data);
  };

  const submitData = (e) => {
    setIsError(true);
    e.preventDefault();
    const reqParam = {
      name: barber.name.trim(),
      zipcode: barber.zipcode.trim(),
      rate: barber.rate.trim(),
      address: barber.address.trim(),
      city: barber.city.trim(),
      state: barber.state.trim(),
      country: barber.country.trim(),
      latitude: barber.latitude.trim(),
      longitude: barber.longitude.trim(),
      about_us: barber.about_us != "" ? barber.about_us.trim() : barber.about_us,
      services: barber.services.map((x) => `${x.service_id}`),
      availability: barber.availability.map((x) => {
        return {
          start_time: x.start_time,
          end_time: x.end_time,
          day: x.day,
          select: x.select,
        };
      }),
      verification: `${barber.business_verification}`,
    };

    props
      .callUpdateServiceProviderApiAction(reqParam, barber.user_id)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            Transition: "zoom",
          });
          history.push(constants.ROUTE.SIDEBAR.SERVICE_PROVIDER);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleStatusChange = (status) => {
    setIsEdit(true);
    const data = { ...barber };
    if (barber) {
      data.business_verification = status;
    }
    setBarberDetail(data);
  };

  return (
    <div className="row">
      <div className="col-12 ">
        <div className="card m-b-30 ">
          <div className="card-body">
            <Link
              to={constants.ROUTE.SIDEBAR.SERVICE_PROVIDER}
              className="btn btn-success float-right mt-2"
              style={{ backgroundColor: "#e31836", borderColor: "#e31836" }}
            >
              {labels.TABLE_LABELS.BACK_BTN}
            </Link>
            <CardHeader
              title={labels.SERVICE_PROVIDER.EDIT_SERVICE_PROVIDER.TITLE}
            />

            {Object.keys(barber).length === 0 &&
            barber.constructor === Object ? (
              // <div className="m-auto h-100 text-center align-items-center">

              <Loader
                className="custome-loader"
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000000} //3 secs
              />
            ) : (
              <>
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <TextFieldComponent
                      id={"Name"}
                      label={labels.TABLE_LABELS.SERVICE_PROVIDER_NAME}
                      className={""}
                      labelClassName={""}
                      inputClassName={""}
                      error={isError && !barber.name}
                      helperText={""}
                      helperTextClassName={""}
                      isDisable={false}
                      value={barber.name}
                      onChange={handleChangeName}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <TextFieldComponent
                      id={"Email"}
                      label={labels.TABLE_LABELS.EMAIL}
                      className={""}
                      labelClassName={""}
                      inputClassName={""}
                      error={isError && !barber.email}
                      helperText={""}
                      helperTextClassName={""}
                      isDisable={true}
                      value={barber.email}
                      onChange={handleChangeEmail}
                    />
                  </div>

                  <div className="col-md-9 mt-3">
                    <TextFieldComponent
                      id={"Address"}
                      label={labels.TABLE_LABELS.ADDRESS}
                      className={""}
                      labelClassName={""}
                      inputClassName={""}
                      error={isError && !barber.address}
                      helperText={""}
                      helperTextClassName={""}
                      isDisable={false}
                      value={barber.address}
                      onChange={handleChangeAddress}
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <TextFieldComponent
                      id={"zipcode"}
                      label={labels.TABLE_LABELS.PINCODE}
                      className={""}
                      labelClassName={""}
                      inputClassName={""}
                      error={isError && !barber.zipcode}
                      helperText={""}
                      helperTextClassName={""}
                      isDisable={false}
                      value={barber.zipcode}
                      onChange={handleChangeZipcode}
                    />
                  </div>
                  <div className="col-sm-4 mt-3">
                    <TextFieldComponent
                      className=""
                      id="city"
                      label={labels.TABLE_LABELS.CITY}
                      labelClassName=""
                      inputClassName=""
                      error={isError && !barber.city}
                      helperText=""
                      helperTextClassName=""
                      isDisable={false}
                      onChange={handleCity}
                      value={barber.city}
                    />
                  </div>
                  <div className="col-sm-4 mt-3">
                    <TextFieldComponent
                      className=""
                      id="state"
                      label={labels.TABLE_LABELS.STATE}
                      labelClassName=""
                      inputClassName=""
                      error={isError && !barber.state}
                      helperText=""
                      helperTextClassName=""
                      isDisable={false}
                      onChange={handleState}
                      value={barber.state}
                    />
                  </div>
                  <div className="col-sm-4 mt-3">
                    <TextFieldComponent
                      type="text"
                      className=""
                      id="country"
                      label={labels.TABLE_LABELS.COUNTRY}
                      labelClassName=""
                      inputClassName=""
                      error={isError && !barber.country}
                      helperText=""
                      helperTextClassName=""
                      isDisable={false}
                      onChange={handleCountry}
                      value={barber.country}
                    />
                  </div>

                  <div className="col-md-3 mt-3">
                    <TextFieldComponent
                      id={"rate"}
                      label={labels.TABLE_LABELS.HOUR_RATE}
                      className={""}
                      labelClassName={""}
                      inputClassName={""}
                      error={isError && !barber.rate}
                      helperText={""}
                      helperTextClassName={""}
                      isDisable={false}
                      value={barber.rate}
                      onChange={handleChangeRate}
                    />
                  </div>
                  <div className="col-md-9 mt-3">
                    <DropdownComponentWithMultiSelect
                      id={"services"}
                      label={labels.TABLE_LABELS.SERVICES}
                      data={services}
                      isLoading={false}
                      onSelect={handleServices}
                      value={
                        barber.services &&
                        barber.services.map((x) => {
                          return {
                            label: x.business_service_name,
                            value: parseInt(x.service_id),
                            id: parseInt(x.service_id),
                          };
                        })
                      }
                      error={
                        isError && barber.services && !barber.services.length
                      }
                    />
                    {/* <TextFieldComponent
                      id={"services"}
                      label={"services"}
                      className={""}
                      labelClassName={""}
                      inputClassName={""}
                      error={""}
                      helperText={""}
                      helperTextClassName={""}
                      isDisable={false}
                    /> */}
                  </div>
                  <div className="col-md-6 mt-3">
                    <TextAreaComponent
                      id={"About"}
                      label={labels.TABLE_LABELS.ABOUT}
                      className={""}
                      labelClassName={""}
                      inputClassName={""}
                      error={isError && !barber.about_us}
                      rows={"17"}
                      helperText={""}
                      helperTextClassName={""}
                      isDisable={false}
                      value={barber.about_us}
                      onChange={handlechangeAbout}
                      maxLength={""}
                      isContentLength={false}
                    />
                  </div>

                  <div className="col-6 mt-3">
                    <TimePickerForAllDays
                      id={"Time"}
                      label={labels.TABLE_LABELS.TIME}
                      shopTime={
                        barber.availability && barber.availability.length
                          ? barber.availability
                          : barberTimeData
                      }
                      handleEndTime={handleEndTime}
                      handleStartTime={handleStartTime}
                      handleCheck={handleCheck}
                      // className={}
                      // labelClassName={}
                      // inputClassName={}
                      error={isError && !barber.availability}
                      // helperText={"sdkjhsdhkjdshkhdskjh"}
                      // helperTextClassName={}
                      isDisable={false}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <p className="input-labels">verification</p>
                    <ImageLoader
                      className={`certicatre-image ${
                        barber.business_verification === 2
                          ? "certicatre-image-accept"
                          : barber.business_verification === 3
                          ? "certicatre-image-reject"
                          : "certicatre-image-pending"
                      }`}
                      // src={
                      //   barber.certificate
                      //     ? `${constants.BASE_URL.API}/images/${barber.certificate}`
                      //     : Placeholder
                      src={barber.certificate}
                      alt="certificate"
                    />
                    {/* <img
                      className={`certicatre-image ${
                        barber.business_verification === 2
                          ? "certicatre-image-accept"
                          : barber.business_verification === 3
                          ? "certicatre-image-reject"
                          : "certicatre-image-pending"
                      }`}
                      onError={() => {
                        alert("error");
                      }}
                      // src={
                      //   barber.certificate
                      //     ? `${constants.BASE_URL.API}/images/${barber.certificate}`
                      //     : Placeholder
                      src={`${constants.BASE_URL.API}/images/${barber.certificate}`}
                      alt="certificate"
                    /> */}
                    {/* <span className="verification-switch ml-2">
                  <label htmlFor="status" className="input-labels">
                    Varification
                  </label>
                  <Switch active={barber.business_verification} onHandelChange={handleStatusChange} />
                </span> */}
                    <div className="d-flex mt-3">
                      <div className="display-status mt-2">
                        <div
                          className={`display-status-text-active ${
                            barber.business_verification === 2
                              ? "ticked-css"
                              : ""
                          }`}
                          onClick={() => handleStatusChange(2)}
                        >
                          {barber.business_verification === 2
                            ? "Accepted"
                            : "Accept"}
                        </div>
                      </div>
                      <div className="display-status mt-2 mx-2">
                        <div
                          className={`display-status-text-inactive ${
                            barber.business_verification === 3
                              ? "ticked-css"
                              : ""
                          }`}
                          onClick={() => handleStatusChange(3)}
                        >
                          {barber.business_verification === 3
                            ? "Rejected"
                            : "Reject"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col mt-5">
                    <div className="form-group text-right mt-2">
                      <button
                        type="submit"
                        className="btn btn-submit"
                        name="update"
                        value="Update"
                        onClick={submitData}
                        disabled={!isEdit}
                      >
                        {labels.TABLE_LABELS.UPDATE}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    {/* <img
                      className="img-fluid"
                      src="../assets/images/small/img-5.jpg"
                      alt="barber-img"
                    /> */}
                    {/* <div className="barber-detail">
                        <div className="float-left">
                            The Great Salon
                        </div>
                        <div className="float-right">
                            <span>open</span>
                        </div>

                    </div> */}
                  </div>
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
      callServiceProviderDetailApiAction: callServiceProviderDetailApi,
      callServicesListApiAction: callServicesListApi,
      callUpdateServiceProviderApiAction: callUpdateServiceProviderApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(EditServiceprovider);
