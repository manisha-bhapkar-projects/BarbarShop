import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="accountbg">
      <div className="content-center">
        <div className="content-desc-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-8">
                <div className="card" style={{background: "rgba(0,0,0,0.5)"}}>
                  <div className="card-block">
                    <div className="ex-page-content text-center">
                      <h1 className="text-primary">
                        4<i className="fa fa-smile-o text-warning ml-1 mr-1"></i>
                        4!
                      </h1>
                      <h3 className="">Sorry, page not found</h3>
                      <br />
                      <Link
                        className="btn btn-primary mb-5 waves-effect waves-light"
                        to="/"
                      >
                        Return
                      </Link>
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
export default PageNotFound;
