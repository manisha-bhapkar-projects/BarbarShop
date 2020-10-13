import React from "react";
import { NavLink, Link } from "react-router-dom";
// import constants from "../../utils/constants";
// import labels from "../../utils/labels";
import { sideBarRoutes } from '../../utils/routes';

function Sidebar() {
  return (
    <div className="left side-menu">
      <button
        type="button"
        className="button-menu-mobile button-menu-mobile-topbar open-left waves-effect"
      >
        <i className="ion-close"></i>
      </button>
      <div className="left-side-logo d-block d-lg-none">
        <div className="text-center">
          <Link to="/dashboard" className="logo">
            <img
              className="img-logo-header-color"
              src="./assets/images/logo-blue.png"
              height="45"
              alt="logo"
            />
            <div className="logo-header-color">
              Your Hair <p>Force One</p>
            </div>
          </Link>
        </div>
      </div>
      {/* <div className="slimScrollDiv"> */}
      <div className="sidebar-inner slimscrollleft">
        <div id="sidebar-menu">
          <ul>
            <li className="menu-title"></li>
            {sideBarRoutes.filter(route => route.sidebar).map((route,index) => {
              return (
                <li className="has_sub" key={index} >
                  <NavLink
                    to={route.path}
                    className="waves-effect d-flex">
                    <i className={route.icon}></i>
                    <span className="text-nowrap">
                      {route.label}
                    </span>
                  </NavLink>
                </li>
              )
            })}

            </ul>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Sidebar;
