import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { callAddConsumerApi } from "../../../actions/consumerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TextFieldComponent from "../../../components/TextFieldComponent/TextFieldComponent";
import CardHeader from "../../../components/CardHeader/CardHeader";
import labels from "../../../utils/labels";
import constants from "../../../utils/constants";
import { showSuccessToast, showFailureToast } from "../../../utils/utils";
import { validationNameWithRegex } from "../../../utils/validation";

function AddConsumers(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [isNameError, setNameError] = useState("");
  const [isAddressError, setAddressError] = useState("");
  const [isEmailError, setEmailError] = useState("");
  const [isZipcodeError, setZipcodeError] = useState("");

  const reqParam = {
    name: name.trim(),
    email: email.trim(),
    address: address.trim(),
    zipcode: zipcode.trim(),
  };
  const history = useHistory();
  const handleChangeName = (e) => {
    setNameError("");
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmailError("");

    setEmail(e.target.value);
  };

  const handleChangePincode = (e) => {
    setZipcodeError("");
    if (
      (e.target.value === "" ||
        validationNameWithRegex(e.target.value, labels.REGEX_PATTERN.NUMBER)) &&
      e.target.value.length <= 5
    ) {
      setPincode(e.target.value);
    }
  };

  const handleChangeAddress = (e) => {
    setAddressError("");
    setAddress(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      address.trim() === "" ||
      zipcode.trim() === ""
    ) {
      if (name.trim() === "") {
        setNameError("* Field is Mandatory");
      }
      if (email.trim() === "") {
        setEmailError("* Field is Mandatory");
      }
      if (address.trim() === "") {
        setAddressError("* Field is Mandatory");
      }
      if (zipcode.trim() === "") {
        setZipcodeError("* Field is Mandatory");
      }
      return null;
    }
    props
      .callAddConsumerApiAction(reqParam)
      .then((res) => {
        if (res.data.status) {
          history.push(constants.ROUTE.SIDEBAR.CONSUMER);
          showSuccessToast("Consumer added successfully");
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
          if ("address" in result) {
            setAddressError(result.address.message);
          }
          if ("email" in result) {
            setEmailError(result.email.message);
          }
          if ("zipcode" in result) {
            setZipcodeError(result.zipcode.message);
          }
          showFailureToast(
            "Please fill all mandatory fields in order to add a consumer"
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
              to={constants.ROUTE.SIDEBAR.CONSUMER}
              className="btn btn-success mt-2 float-right"
              style={{ backgroundColor: "#e31836", borderColor: "#e31836" }}
            >
              Back
            </Link>
            <CardHeader title={labels.CONSUMER.ADD_CONSUMER.TITLE} />

            <div className="row ">
              <div className="col-sm-4">
                <TextFieldComponent
                  className=""
                  id="user-name"
                  label="user name *"
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
                  label="Email *"
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
                  // type="number"
                  className=""
                  id="user-pincode"
                  label="pincode *"
                  labelClassName=""
                  inputClassName=""
                  error={isZipcodeError ? true : false}
                  helperText={isZipcodeError}
                  helperTextClassName=""
                  isDisable={false}
                  onChange={handleChangePincode}
                  value={zipcode}
                />
              </div>
              <div className="col-sm-12 mt-3">
                <TextFieldComponent
                  className=""
                  id="address"
                  label="Address *"
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

              <div className="col-12 text-center mt-5">
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
                  Submit
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
      callAddConsumerApiAction: callAddConsumerApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AddConsumers);
