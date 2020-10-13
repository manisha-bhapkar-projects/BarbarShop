import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextFieldComponent from "../../../components/TextFieldComponent/TextFieldComponent";
import {
  validdateEmail,
  validationNameWithRegex,
} from "../../../utils/validation";
import messages from "../../../utils/messages";
import fetchClient from "../../../utils/axiosConfig";
import constants from "../../../utils/constants";
import labels from "../../../utils/labels";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LogoBlue from '../../../images/logo-blue.png'


function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [errorOtp, setErrorOtp] = useState("");
  const [errorpassword, setErrorPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const [sendOtp, setsendOtp] = useState(false);

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
    if (!validdateEmail(e.target.value) && e.target.value !== "") {
      setEmailError(messages.LOGIN.ERR_USERNAME_INVALID);
    } else if (e.target.value === "") {
      setEmailError(messages.LOGIN.ERR_USERNAME_MANDATORY);
    } else {
      setEmailError("");
    }
  };
  const handelSendMail = (e) => {
    e.preventDefault();
    if (!validdateEmail(email) && email !== "") {
      setEmailError(messages.LOGIN.ERR_USERNAME_INVALID);
      return null;
    } else if (email === "") {
      setEmailError(messages.LOGIN.ERR_USERNAME_MANDATORY);
      return null;
    }

    fetchClient
      .post(constants.API.LOGIN.SEND_OTP, { email })
      .then((res) => {
        if (res.data.status) {
          setsendOtp(true);
          Swal.fire({
            title: res.data.message,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            position: "center",
          });
        } else {
          Swal.fire({
            title: res.data.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
            position: "center",
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        Swal.fire({
          title: err.message,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          position: "center",
        });
      });
  };
  const handelCancel = () => {
    props.history.push("/");
  };
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setErrorPassword(messages.LOGIN.ERR_PASSWORD_MANDATORY);
    } else if (
      !validationNameWithRegex(e.target.value, labels.LOGIN.REGEX_OF_PASSWORD)
    ) {
      if (
        !validationNameWithRegex(
          e.target.value,
          labels.LOGIN.REGEX_OF_PASSWORD_NUMBER
        )
      ) {
        setErrorPassword(messages.LOGIN.REGEX_OF_PASSWORD_NUMBER);
      } else if (
        !validationNameWithRegex(
          e.target.value,
          labels.LOGIN.REGEX_OF_PASSWORD_UPPERCASE
        )
      ) {
        setErrorPassword(messages.LOGIN.REGEX_OF_PASSWORD_UPPERCASE);
      } else if (
        !validationNameWithRegex(
          e.target.value,
          labels.LOGIN.REGEX_OF_PASSWORD_LOVERCASE
        )
      ) {
        setErrorPassword(messages.LOGIN.REGEX_OF_PASSWORD_LOVERCASE);
      } else if (
        !validationNameWithRegex(
          e.target.value,
          labels.LOGIN.REGEX_OF_PASSWORD_SPECIAL
        )
      ) {
        setErrorPassword(messages.LOGIN.REGEX_OF_PASSWORD_SPECIAL);
      } else {
        setErrorPassword(messages.LOGIN.REGEX_OF_PASSWORD_MINIMUM);
      }
    } else {
      setErrorPassword("");
    }
  };

  const handleSetOtp = (e) => {
    setOtp(e.target.value);
    setErrorOtp("");
  };

  const handelSubmitMail = (e) => {
    e.preventDefault();

    fetchClient
      .post(constants.API.LOGIN.FORGOT_PASSWORD, { email, password, otp })
      .then((res) => {
        if (res.data.status) {
          // setsendOtp(true);
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
          props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="accountbg">
      <div className="content-center">
        <div className="content-desc-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-8">
                <div className="card" style={{ background: "rgba(0,0,0,0.5)" }}>
                  <div className="card-body">
                    <h3 className="text-center mt-0 m-b-15">
                      <Link to="/" className="logo logo-admin">
                        <img
                          src={LogoBlue}
                          height="60"
                          width="60"
                          alt="logo"
                        />
                        <h4 className="text-muted text-center font-22">
                          <b style={{ color: "#6699FF" }}>
                            Your Hair Force One
                          </b>
                        </h4>
                      </Link>
                    </h3>
                    <h4 className="text-muted text-center font-18">
                      <b>Reset Password</b>
                    </h4>
                    <div className="p-3">
                      <form className="form-horizontal m-t-20">
                        <div className="alert alert-danger alert-dismissible">
                          <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-hidden="true"
                          >
                            ×
                          </button>
                          Enter your <b>Email</b> and instructions will be sent
                          to you!
                        </div>
                        <div className="form-group row">
                          <div className="col-12">
                            <TextFieldComponent
                              className={""}
                              id={"user-name"}
                              label={""}
                              labelClassName={""}
                              inputClassName={""}
                              error={emailError ? true : false}
                              helperText={emailError}
                              helperTextClassName={""}
                              isDisable={false}
                              placeholder="Email"
                              value={email}
                              onChange={handleSetEmail}
                            />
                          </div>
                          {sendOtp ? (
                            <>
                              <div className="col-12 my-2">
                                <TextFieldComponent
                                  type="password"
                                  className={""}
                                  id={"newpass"}
                                  label={""}
                                  labelClassName={""}
                                  inputClassName={""}
                                  error={errorpassword ? true : false}
                                  helperText={errorpassword}
                                  helperTextClassName={""}
                                  isDisable={false}
                                  placeholder="New Password"
                                  value={password}
                                  onChange={handleSetPassword}
                                />
                              </div>
                              <div className="col-12">
                                <TextFieldComponent
                                  className={""}
                                  id={"otp"}
                                  label={""}
                                  labelClassName={""}
                                  inputClassName={""}
                                  error={errorOtp ? true : false}
                                  helperText={errorOtp}
                                  helperTextClassName={""}
                                  isDisable={false}
                                  placeholder="OTP"
                                  value={otp}
                                  onChange={handleSetOtp}
                                />
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="form-group text-center row m-t-20">
                          <div className="col-12">
                            {sendOtp ? (
                              <button
                                className="btn btn-primary btn-block waves-effect waves-light"
                                type="submit"
                                onClick={handelSubmitMail}
                              >
                                Submit
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary btn-block waves-effect waves-light"
                                type="submit"
                                onClick={handelSendMail}
                              >
                                Send Otp
                              </button>
                            )}
                            <button
                              className="btn btn-primary btn-block waves-effect waves-light"
                              type="submit"
                              onClick={handelCancel}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
