import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  callUpdateConsumerDetailApi,
  callConsumerDetailApi,
} from "../../../actions/consumerAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TextFieldComponent from "../../../components/TextFieldComponent/TextFieldComponent";
import DropdownComponentWithSearchBar from "../../../components/DropdownSearch/DropdownComponentWithSearchBar";
import { SelectGender } from "../../../utils/DemoData";
import TextAreaComponent from "../../../components/TextAreaComponent/TextAreaComponent";
import constants from "../../../utils/constants";
import CardHeader from "../../../components/CardHeader/CardHeader";
import { showSuccessToast, showFailureToast } from "../../../utils/utils";
import { validationNameWithRegex } from "../../../utils/validation";
import labels from "../../../utils/labels";

function EditConsumers(props) {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isNameError, setNameError] = useState("");
  const [isAddressError, setAddressError] = useState("");
  const [isEmailError, setEmailError] = useState("");
  const [isZipcodeError, setZipcodeError] = useState("");
  const [isGenderError, setGenderError] = useState("");

  const history = useHistory();
  useEffect(() => {
    props
      .callConsumerDetailApiAction(props.match.params.id)
      .then((res) => {
        if (res.data.status) {
          setUser(res.data.result[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleGender = (gender) => {
    const data = { ...user };
    setIsEdit(true);
    if (user) {
      setGenderError("");
      data.gender = gender;
    }
    setUser(data);
  };
  const handleChangePincode = (e) => {
    setIsEdit(true);
    const data = { ...user };
    if (user) {
      setZipcodeError("");
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
    setUser(data);
  };
  const handleChangeAddress = (e) => {
    setIsEdit(true);

    const data = { ...user };
    if (user) {
      setAddressError("");
      data.address = e.target.value;
    }
    setUser(data);
  };
  const handleChangeName = (e) => {
    setIsEdit(true);

    const data = { ...user };
    setNameError("");
    if (user) {
      data.name = e.target.value;
    }
    setUser(data);
  };
  const handleChangeEmail = (e) => {
    setIsEdit(true);

    const data = { ...user };
    if (user) {
      data.email = e.target.value;
    }
    setUser(data);
  };

  const submitData = (e) => {
    setError(true);
    e.preventDefault();
    const reqParam = {
      name: user.name.trim(),
      zipcode: user.zipcode.trim(),
      address: user.address.trim(),
      gender:
        user.gender === null || user.gender === "" ? undefined : user.gender,
    };
    if (
      user.name.trim() === "" ||
      user.gender === null ||
      user.address.trim() === "" ||
      user.zipcode.trim() === ""
    ) {
      if (user.name.trim() === "") {
        setNameError("* Field is Mandatory");
      }
      if (user.gender === null) {
        setGenderError("* Field is Mandatory");
      }
      if (user.address.trim() === "") {
        setAddressError("* Field is Mandatory");
      }
      if (user.zipcode.trim() === "") {
        setZipcodeError("* Field is Mandatory");
      }
      return null;
    }
    props
      .callUpdateConsumerDetailApiAction(reqParam, props.match.params.id)
      .then((res) => {
        if (res.data.status) {
          history.push(constants.ROUTE.SIDEBAR.CONSUMER);
          showSuccessToast("consumer details updated");
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
      <div className="col-12 ">
        <div className="card m-b-30 ">
          <div className="card-body">
            <Link
              to={constants.ROUTE.SIDEBAR.CONSUMER}
              className="btn btn-success float-right mt-2"
              style={{ backgroundColor: "#e31836", borderColor: "#e31836" }}
            >
              Back
            </Link>
            {/* <CardHeader title={labels.CONSUMER.EDIT_CONSUMER.TITLE} /> */}
            <CardHeader title={user.name ? user.name : "User"} />

            {/* <h4 className="mt-0 header-title">Edit User</h4> */}
            <div className="row ">
              <div className="col-md-6 mt-3">
                <TextFieldComponent
                  id={"Name"}
                  label={"Name *"}
                  className={""}
                  labelClassName={""}
                  inputClassName={""}
                  error={isNameError ? true : false}
                  helperText={isNameError}
                  helperTextClassName={""}
                  isDisable={false}
                  value={user.name}
                  onChange={handleChangeName}
                />
              </div>
              <div className="col-md-6 mt-3">
                <TextFieldComponent
                  id={"Email"}
                  label={"Email"}
                  className={""}
                  labelClassName={""}
                  inputClassName={""}
                  error={error && !user.email}
                  helperText={isEmailError}
                  helperTextClassName={""}
                  isDisable={true}
                  value={user.email}
                  onChange={handleChangeEmail}
                />
              </div>

              <div className="col-md-6 mt-3">
                <TextAreaComponent
                  id={"Adress"}
                  label={"Adress *"}
                  className={""}
                  labelClassName={""}
                  inputClassName={""}
                  error={isAddressError ? true : false}
                  rows={"7"}
                  helperText={isAddressError}
                  helperTextClassName={""}
                  isDisable={""}
                  value={user.address}
                  onChange={handleChangeAddress}
                  maxLength={""}
                  isContentLength={false}
                />
              </div>
              <div className="col-md-3 mt-3">
                <TextFieldComponent
                  id={"zipcode"}
                  label={"zipcode *"}
                  className={""}
                  labelClassName={""}
                  inputClassName={""}
                  error={isZipcodeError ? true : false}
                  helperText={isZipcodeError}
                  helperTextClassName={""}
                  isDisable={false}
                  value={user.zipcode}
                  onChange={handleChangePincode}
                />
                <DropdownComponentWithSearchBar
                  data={SelectGender}
                  label={"Gender"}
                  value={
                    user.gender
                      ? user.gender.charAt(0).toUpperCase() +
                        user.gender.slice(1)
                      : ""
                  }
                  id="gender"
                  onSelect={handleGender}
                  // filterDropdown={}
                  // className={}
                  // labelClassName={}
                  // noOptionsMessage={}
                  error={isGenderError ? true : false}
                  helperText={isGenderError}
                  // isDisabled={}
                />
              </div>

              <div className="col-md-3 mt-3 align-self-end ">
                <div className="form-group text-right">
                  <button
                    type="submit"
                    className="btn btn-submit"
                    name="update"
                    value="Update"
                    onClick={submitData}
                    disabled={!isEdit}
                  >
                    Update
                  </button>
                </div>
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
      callConsumerDetailApiAction: callConsumerDetailApi,
      callUpdateConsumerDetailApiAction: callUpdateConsumerDetailApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(EditConsumers);
