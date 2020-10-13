import React from "react";
import "./App.css";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import PublicRoute from "./utils/routes/PublicRoute";
import PrivateRoute from "./utils/routes/PrivateRoute";
import LayoutwithSidebar from "./components/Layout/LayoutwithSidebar";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Login/ForgotPassword/ForgotPassword";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { sideBarRoutes } from "./utils/routes";
import history from "./utils/history";
import {
  storeAuthToken,
  storeRefreshToken,
  storeAdminData,
} from "./utils/storage";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { callLogoutApi } from "./actions/authAction";

function App(props) {
  const onLogoutClickHandler = () => {
    props
      .callLogoutApiAction()
      .then((response) => {
        if (response.data.status) {
          storeAuthToken();
          storeRefreshToken();
          storeAdminData();
          history.push("/");
        } else {
          console.log(response);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Router history={history}>
      <div id="preloader">
        <div id="status">
          <div className="spinner"></div>
        </div>
      </div>
      <Switch>
        <PublicRoute path="/" exact component={Login} />
        <PublicRoute path="/forgot-password" exact component={ForgotPassword} />
        <Route path="/404" exact component={PageNotFound} />
        <Switch>
          <LayoutwithSidebar onLogoutClickHandler={onLogoutClickHandler}>
            <Switch>
              {sideBarRoutes.map((item, index) => {
                return (
                  <PrivateRoute
                    path={item.path}
                    exact
                    component={item.component}
                    key={index}
                  />
                );
              })}
            </Switch>
          </LayoutwithSidebar>
          <Redirect from="*" to="/404" />
        </Switch>
        <Redirect from="*" to="/404" />
      </Switch>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callLogoutApiAction: callLogoutApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(App);
