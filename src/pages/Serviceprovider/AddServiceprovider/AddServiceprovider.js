import React, { useState } from "react";
// import fetchClient from "../../Util/axiosConfig";
import { callAddServiceProviderApi } from "../../../actions/serviceProviderAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TextFieldComponent from "../../../components/TextFieldComponent/TextFieldComponent";
import { Link, useHistory } from "react-router-dom";
import constants from "../../../utils/constants";
import labels from "../../../utils/labels";
import { showFailureToast, showSuccessToast } from "../../../utils/utils";
// import FileInput from "../../../components/FileInput/FileInput";
import CardHeader from "../../../components/CardHeader/CardHeader";
import { validationNameWithRegex } from "../../../utils/validation";

function AddServiceprovider(props) {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [rate, setHoursRate] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");

  const [isNameError, setNameError] = useState("");
  const [isEmailError, setEmailError] = useState("");
  const [isZipcodeError, setPincodeError] = useState("");
  const [isAddressError, setAddressError] = useState("");
  const [isRateError, setHoursRateError] = useState("");
  const [isCityError, setcityError] = useState("");
  const [isStateError, setstateError] = useState("");
  const [isCountryError, setcountryError] = useState("");

  const serviceProvider = {
    name:name.trim(),
    email:email.trim(),
    address:address.trim(),
    zipcode:zipcode.trim(),
    rate:rate.trim(),
    city:city.trim(),
    state:state.trim(),
    country:country.trim(),
    latitude: "79.123",
    longitude: "45.123456",
  };

  const handleChangeName = (e) => {
    setNameError("");
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmailError("");
    setEmail(e.target.value);
  };
  const handleChangeRate = (e) => {
    if (
      e.target.value === "" ||
      validationNameWithRegex(e.target.value, labels.REGEX_PATTERN.NUMBER)
    ) {
      setHoursRateError("");
      setHoursRate(e.target.value);
    }
  };
  const handleChangeAddress = (e) => {
    setAddressError("");
    setAddress(e.target.value);
  };
  const handleChangeZipcode = (e) => {
    if (
      (e.target.value === "" ||
        validationNameWithRegex(e.target.value, labels.REGEX_PATTERN.NUMBER)) &&
      e.target.value.length <= 5
    ) {
      setPincodeError("");
      setPincode(e.target.value);
    }
  };
  const handleChangeCity = (e) => {
    setcityError("");
    setcity(e.target.value);
  };
  const handleChangeState = (e) => {
    setstateError("");
    setstate(e.target.value);
  };
  const handleChangeContry = (e) => {
    setcountryError("");
    setcountry(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props
      .callAddServiceProviderApiAction(serviceProvider)
      .then((res) => {
        if (res.data.status) {
          showSuccessToast("Service Provider added successfully");
          history.push(constants.ROUTE.SIDEBAR.SERVICE_PROVIDER);
        } else if (res.data.code === 202) {
          showFailureToast(
            "User with this email Id already registered with us"
          );
        } else {
          showFailureToast("Unexpected Error. Please try again later");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          let result = error.response.data.result;
          if ("name" in result) {
            setNameError(result.name.message);
          }
          if ("email" in result) {
            setEmailError(result.email.message);
          }
          if ("rate" in result) {
            setHoursRateError(result.rate.message);
          }
          if ("address" in result) {
            setAddressError(result.address.message);
          }
          if ("zipcode" in result) {
            setPincodeError(result.zipcode.message);
          }
          if ("city" in result) {
            setcityError(result.city.message);
          }
          if ("state" in result) {
            setstateError(result.state.message);
          }
          if ("country" in result) {
            setcountryError(result.country.message);
          }
          showFailureToast(
            "Please fill all mandatory fields in order to add a service providers"
          );
        }
      });
  };
  return (
    <div className="row">
      <div className="col-12">
        <div className="card m-b-30 mt-3">
          <div className="card-body">
            <Link
              to={constants.ROUTE.SIDEBAR.SERVICE_PROVIDER}
              className="btn btn-success float-right"
              style={{ backgroundColor: "#e31836", borderColor: "#e31836" }}
            >
              {labels.TABLE_LABELS.BACK_BTN}
            </Link>
            <CardHeader
              title={labels.SERVICE_PROVIDER.ADD_SERVICE_PROVIDER.TITLE}
            />

            <div className="row mt-3">
              <div className="col-sm-4">
                <TextFieldComponent
                  className=""
                  id="user-name"
                  label={labels.TABLE_LABELS.SERVICE_PROVIDER_NAME}
                  labelClassName=""
                  inputClassName=""
                  error={isNameError ? true : false}
                  helperText={isNameError}
                  helperTextClassName=""
                  isDisable={false}
                  onChange={handleChangeName}
                  value={name}
                />
              </div>
              <div className="col-sm-4">
                <TextFieldComponent
                  className=""
                  id="user-email"
                  label={labels.TABLE_LABELS.EMAIL}
                  labelClassName=""
                  inputClassName=""
                  error={isEmailError ? true : false}
                  helperText={isEmailError}
                  helperTextClassName=""
                  isDisable={false}
                  onChange={handleChangeEmail}
                  value={email}
                />
              </div>
              <div className="col-sm-4">
                <TextFieldComponent
                  className=""
                  id="rate"
                  label={labels.TABLE_LABELS.HOUR_RATE}
                  labelClassName=""
                  inputClassName=""
                  error={isRateError ? true : false}
                  helperText={isRateError}
                  helperTextClassName=""
                  isDisable={false}
                  onChange={handleChangeRate}
                  value={rate}
                />
              </div>
              <div className="col-sm-8 mt-3">
                <TextFieldComponent
                  className=""
                  id="address"
                  label={labels.TABLE_LABELS.ADDRESS}
                  labelClassName=""
                  inputClassName=""
                  error={isAddressError ? true : false}
                  helperText={isAddressError}
                  helperTextClassName=""
                  isDisable={false}
                  onChange={handleChangeAddress}
                  value={address}
                />
              </div>
              <div className="col-sm-4 mt-3">
                <TextFieldComponent
                  className=""
                  id="user-pincode"
                  label={labels.TABLE_LABELS.PINCODE}
                  labelClassName=""
                  inputClassName=""
                  error={isZipcodeError ? true : false}
                  helperText={isZipcodeError}
                  helperTextClassName=""
                  isDisable={false}
                  onChange={handleChangeZipcode}
                  value={zipcode}
                />
              </div>
              <div className="col-sm-4 mt-3">
                <TextFieldComponent
                  className=""
                  id="city"
                  label={labels.TABLE_LABELS.CITY}
                  labelClassName=""
                  inputClassName=""
                  error={isCityError ? true : false}
                  helperText={isCityError}
                  helperTextClassName=""
                  isDisable={false}
                  onChange={handleChangeCity}
                  value={city}
                />
              </div>
              <div className="col-sm-4 mt-3">
                <TextFieldComponent
                  className=""
                  id="state"
                  label={labels.TABLE_LABELS.STATE}
                  labelClassName=""
                  inputClassName=""
                  error={isStateError ? true : false}
                  helperText={isStateError}
                  helperTextClassName=""
                  isDisable={false}
                  onChange={handleChangeState}
                  value={state}
                />
              </div>
              <div className="col-sm-4 mt-3">
                <TextFieldComponent
                  className=""
                  id="country"
                  label={labels.TABLE_LABELS.COUNTRY}
                  labelClassName=""
                  inputClassName=""
                  error={isCountryError ? true : false}
                  helperText={isCountryError}
                  helperTextClassName=""
                  isDisable={false}
                  onChange={handleChangeContry}
                  value={country}
                />
              </div>

              <div className="col-12 text-right px-0 mt-5">
                <button
                  style={{
                    color: "#fff",
                    background: "#508AEB",
                    border: "none",
                    borderRadius: 5,
                    padding: "11px 19px 11px",
                    marginRight: 19,
                  }}
                  onClick={handleSubmit}
                >
                  {labels.TABLE_LABELS.SUBMIT}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callAddServiceProviderApiAction: callAddServiceProviderApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AddServiceprovider);
