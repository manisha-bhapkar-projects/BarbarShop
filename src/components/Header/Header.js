import React from "react";
import { Link } from "react-router-dom";
// import { removeToken, removeUserId } from "../../config/config";
// import { useHistory } from "react-router-dom";
import Logo from "../../images/Logo.png";
import {
  // storeAuthToken,
  // storeRefreshToken,
  // storeAdminData,
  getAdminEmail,
} from "../../utils/storage";
// import User from "../../images/user.png";
import User from "../../images/user_white.png";
import constants from "../../utils/constants";
// import User from "../../images/user1.png";

function Header({onLogoutClickHandler}) {
  // const history = useHistory();
  return (
    <div className="topbar">
      <div className="topbar-left	d-none d-lg-block">
        <div className="text-center">
          <Link to={constants.ROUTE.SIDEBAR.DASHBORD} className="logo">
            <img
              className="img-logo-header"
              src={Logo}
              height="45"
              alt="logo"
            />
            {/* <div className="logo-header">
              Your Hair <p>Force One</p>
            </div> */}
          </Link>
        </div>
      </div>
      <nav className="navbar-custom">
        <ul className="list-inline float-right mb-0">
          <li className="list-inline-item dropdown notification-list">
            <div
              className="nav-link dropdown-toggle arrow-none waves-effect nav-user"
              data-toggle="dropdown"
              // href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <div className="rounded-circle-logo">
                <img className="img-fluid" src={User} alt="user" />
              </div>
            </div>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown">
              <Link className="dropdown-item overflow-ellipsis px-1" style={{color:'#508AEB'}} to="/">
                {getAdminEmail()}
              </Link>
              <div
                className="dropdown-item logout"
                onClick={onLogoutClickHandler}
              >
                <i className="mdi mdi-logout m-r-5 text-muted"></i> Logout
              </div>
            </div>
          </li>
        </ul>
        <ul className="list-inline menu-left mb-0">
          <li className="list-inline-item">
            <button
              type="button"
              className="button-menu-mobile open-left waves-effect"
            >
              <i className="ion-navicon"></i>
            </button>
          </li>
        </ul>
        <div className="clearfix"></div>
      </nav>
    </div>
  );
}

export default Header;
