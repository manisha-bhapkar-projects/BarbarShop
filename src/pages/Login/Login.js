import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  storeAuthToken,
  storeRefreshToken,
  storeAdminData,
} from "../../utils/storage";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
// import { validdateEmail, validationNameWithRegex, } from "../../utils/validation";
import messages from "../../utils/messages";
import labels from "../../utils/labels";
import constants from "../../utils/constants";
import { callLoginApi } from '../../actions/authAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showFailureToast} from '../../utils/utils';
import LogoBlue from '../../images/logo-blue.png'
import Swal from "sweetalert2";

const Login = (props) => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    if(emailError !== "" || passwordError !== ""){
      return null
    }

    if (email === "" || password === "") {
      if (email === "") {
        setEmailError(messages.LOGIN.ERR_USERNAME_MANDATORY);
      }
      if (password === "") {
        setPasswordError(messages.LOGIN.ERR_PASSWORD_MANDATORY);
      }
      return null;
    }else{
      props.callLoginApiAction({
        email : email.trim(),
        password : password.trim(),
      }).then((response) => {
        if (response.data.status) {
          storeAuthToken(response.data.result.token);
          storeRefreshToken(response.data.result.refresh_token);
          storeAdminData(response.data.result);
          props.history.push(constants.ROUTE.SIDEBAR.DASHBORD);
          Swal.fire({
            title: messages.LOGIN.SUCCESS,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            position: "center",
          });
        } else {
          if(response.data.code === 202){
            // User not exist in database
            showFailureToast("Please Check your email, as we haven't find your email registered with us");
          }
        }
      }).catch((err) => {
        if(err.response.status === 400){
          let result = err.response.data.result;
          if('email' in result){
            setEmailError(result.email.message)
          }
          if('password' in result){
            setPasswordError(result.password.message)
          }
        }else if(err.response.status === 401){
          showFailureToast("Email or Password doesn't match")
        }
      });
    }
  };

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError(messages.LOGIN.ERR_USERNAME_MANDATORY);
    } else {
      setEmailError("");
    }
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordError(messages.LOGIN.ERR_PASSWORD_MANDATORY);
    } else {
      setPasswordError("");
    }
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
                      <Link to="/dashboard" className="logo logo-admin">
                        <img
                          src={LogoBlue}
                          height="60"
                          width="60"
                          alt="logo"
                        />
                        <h4 className="text-muted text-center font-22">
                          <b style={{ color: "#6699FF" }}>
                            {labels.GLOBAL.TITLE}
                          </b>
                        </h4>
                      </Link>
                    </h3>
                    <h4 className="text-muted text-center font-18">
                      <b>Sign In</b>
                    </h4>
                    <div className="p-2">
                      <form className="form-horizontal m-t-20">
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
                        </div>
                        <div className="form-group row">
                          <div className="col-12">
                            <TextFieldComponent
                              className={""}
                              id={"password"}
                              label={""}
                              labelClassName={""}
                              inputClassName={""}
                              error={
                                passwordError ? true : false
                              }
                              helperText={passwordError}
                              helperTextClassName={""}
                              isDisable={false}
                              placeholder="Password"
                              type="password"
                              value={password}
                              onChange={handleSetPassword}
                            />
                          </div>
                        </div>
                        <div className="form-group text-center row m-t-20">
                          <div className="col-12">
                            <button
                              className="btn btn-primary btn-block waves-effect waves-light"
                              type="submit"
                              onClick={handleLogin}
                            >
                              Log In
                            </button>
                          </div>
                        </div>
                        <div className="form-group m-t-10 mb-0 row">
                          <div className="col-sm-7 m-t-20">
                            <Link to="/forgot-password" className="text-muted">
                              <i className="mdi mdi-lock"></i> Forgot your
                              password?
                            </Link>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      callLoginApiAction: callLoginApi,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Login);
