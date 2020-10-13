import React from 'react';
// import PropTypes from 'prop-types';
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

const LayoutwithSidebar = ({ children , onLogoutClickHandler }) => {
    return (
        <div id="wrapper">
            <Sidebar />
            <div className="content-page">
                <div className="content">
                    <Header onLogoutClickHandler={onLogoutClickHandler}/>
                    <div className="container-fluid">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

LayoutwithSidebar.propTypes = {};

export default LayoutwithSidebar;