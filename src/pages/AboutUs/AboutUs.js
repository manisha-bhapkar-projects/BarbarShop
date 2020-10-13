import React, { useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import labels from "../../utils/labels";
import fetchClient from "../../utils/axiosConfig";
import constants from "../../utils/constants";
// import TextAreaComponent from "../../Components/TextAreaComponent/TextAreaComponent";
import { toast } from "react-toastify";

export default function AboutUs() {
  const [content, setContent] = useState({});
  // const [errorContent, setErrorContent] = useState("");

  const config = {
    height: 500,
    placeholder: "typing ...",
    readonly: false,
  };
  useEffect(() => {
    fetchClient
      .get(constants.API.ABOUT_US.API)
      .then((res) => {
        if (res.data.status) {
          setContent(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = (e) => {
    // console.log(content);
    e.preventDefault();
    fetchClient
      .put(constants.API.ABOUT_US.API, content)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            Transition:'zoom',
          });
          // setContent(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // if (content.description) {
    // } else {
    //   setErrorContent("* Is Mandatory");
    // }
  };
  return (
    <div className="row">
      <div className="col-12">
        <div className="card m-b-30 custome-card">
          <div className="card-body">
            <h4 className="mt-0 header-title">{labels.ABOUT_US.TITLE}</h4>
            <JoditEditor
              ref={null}
              value={content.description ? `${content.description}` : ""}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) =>
                setContent({
                  ...content,
                  description: newContent.target.innerHTML,
                })
              } // preferred to use only this option to update the content for performance reasons
              // onChange={(newContent) => {}}
            />
            <div className="mx-auto">
              <button
                className="btn-success  btn mt-3 float-right"
                style={{
                  color: "#fff",
                  background: "#508AEB",
                  border: "none",
                  borderRadius: 5,
                  padding: "11px 19px 11px",
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
  );
}
