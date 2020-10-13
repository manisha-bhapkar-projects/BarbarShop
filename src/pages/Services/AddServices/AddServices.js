import React, { useState } from "react";
import { Link } from "react-router-dom";
import fetchClient from "../../../utils/axiosConfig";
import { callAddServicesApi } from "../../../actions/servicesAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
// import { baseURL } from "../../config/config";
import TextFieldComponent from "../../../components/TextFieldComponent/TextFieldComponent";
import constants from "../../../utils/constants";
import FileInput from "../../../components/FileInput/FileInput";
import CardHeader from "../../../components/CardHeader/CardHeader";
import labels from "../../../utils/labels";
import { toast } from "react-toastify";

function AddServices(props) {
  const [serviceName, setServiceName] = useState("");
  const [imageName, setImageName] = useState("");
  const [nameError, setNameError] = useState("");
  // const [imageError, setImageError] = useState("");

  // file upload
  const [signedDocumentName, setSignedDocumentFileName] = useState("");
  const [signedDocument, setSignedDocument] = useState({});

  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [documentLink, setDocumentLink] = useState("");
  // const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  // const onSelectImage = (e) => {
  //   setImageError("");
  //   var url = "imageupload";
  //   const data = new FormData();
  //   data.append("profile", e.target.files[0]);
  //   // fetchClient.post(url, data).then((res) => {
  //   //   if (res.data.status) {
  //   //     setImageName(res.data.data);
  //   //   }

  //   //   //   setImagePath(res.data[0]);
  //   // });
  // };

  const handleFileInputChange = (e) => {
    const { files } = e.target;
    // console.log("handleFileInputChange", files, e.target.files);
    if (files.length > 0) {
      const isError = validateFile(files[0]);
      if (isError) return;
      setSignedDocument(files[0]);
      setSignedDocumentFileName(files[0].name);
    }
  };

  const handleFileUpload = () => {
    // check file is not selected
    if (!signedDocumentName) {
      setErrorMessage("* PLEASE SELECT IMAGES");
      // setIsErrorMessage(true);
      return true;
    }

    const isError = validateFile(signedDocument);
    if (isError) return true;
    setIsFileUploading(true);

    setUploadPercentage(20);
    setTimeout(() => {
      setUploadPercentage(50);
    }, 1000);
    setTimeout(() => {
      setUploadPercentage(75);
    }, 2000);
    const data = new FormData();
    data.append("file", signedDocument);
    fetchClient.post(constants.API.FILE_UPLOAD.UPLOAD, data).then((res) => {
      if (res.data.status) {
        setImageName(res.data.result[0]);
        setUploadPercentage(100);
        setIsFileUploading(false);
      }
    });

    // setTimeout(() => {
    //   setDocumentLink("img.jpg (184 kb)");
    //   setUploadPercentage(100);
    //   setIsFileUploading(false);
    // }, 3000);

    return true;
  };

  const validateFile = (file) => {
    // console.log(
    //   // /(jpe?g|png|gif|bmp)$/.test(file.type)
    // );
    if (!/(jpe?g|png)$/.test(file.type)) {
      setErrorMessage("SELECT_VALID_DOCUMENT");
      // setIsErrorMessage(true);
      return true;
    }
    if (file.size / 1024 / 1024 > 10) {
      setErrorMessage("ERROR_DOCUMENT_SIZE");
      // setIsErrorMessage(true);
      return true;
    }
    return false;
  };

  const handleRemoveImage = () => {
    setDocumentLink("");
    setSignedDocument({});
    setSignedDocumentFileName("");
    setUploadPercentage(0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (serviceName === "") {
    //   setIsErrorMessage(true);
    //   setNameError("* Field is Mendotery");
    // }
    if (imageName === "") {
      setErrorMessage("Please Upload Image");
    }

    const reqParam = {
      name: serviceName.trim(),
      image: imageName.trim(),
    };
    props
      .callAddServicesApiAction(reqParam)

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
          });
          history.push(constants.ROUTE.SIDEBAR.SERVICES);
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          let result = error.response.data.result;
          if ("name" in result) {
            setNameError(result.name.message);
          }
          if ("image" in result) {
            setErrorMessage(result.image.message);
          }
        }
      });
  };
  return (
    <div className="row">
      <div className="col-12">
        <div className="card m-b-30">
          <div className="card-body">
            <Link
              to={constants.ROUTE.SIDEBAR.SERVICES}
              className="btn btn-success mt-2 float-right"
              style={{ backgroundColor: "#e31836", borderColor: "#e31836" }}
            >
              Back
            </Link>
            <CardHeader title={labels.SERVICES.ADD_SERVICE.TITLE} />
            <div className="row mt-3">
              <div className="col-md-6 col-sm-12">
                <FileInput
                  name="signedDocuent" // unique name
                  label="Select Images" // label
                  className=""
                  // fileTypes=".png, .jpg, .jpeg" // fileType to show
                  accept=".png, .jpg, .jpeg" // accept to restrict other files
                  handleInputChange={handleFileInputChange} // handle file change
                  fileName={signedDocumentName} // selected file name
                  handleFileUpload={handleFileUpload} // upload button click
                  uploadPercentage={uploadPercentage}
                  isFileUploading={isFileUploading}
                  fileLinkAfterUpload={documentLink}
                  handleRemoveImage={handleRemoveImage}
                  isError={errorMessage ? true : false}
                  errorMessage={errorMessage}
                />
                <TextFieldComponent
                  className="service-text-field mt-2"
                  //   inputClassName="service-text-field"
                  id="service-name"
                  labelClassName="form-input-label"
                  label="services Name"
                  error={nameError ? true : false}
                  helperText={nameError}
                  placeholder="Service Name"
                  onChange={(e) => {
                    setServiceName(e.target.value);
                    setNameError("");
                  }}
                  value={serviceName}
                />
                {/* <div className="row">
                  <div className="col-3 text-right">Select Image</div>
                  <div className="col-9">
                    <div className="tab_file_Upload float-left">
                      <div className="resume_upload">
                        <input
                          //  style={{
                          //     color: "#fff",
                          //     background: "#e31836",
                          //     border: "none",
                          //     borderRadius: 5,
                          //     padding: "13px 19px 11px",
                          //     marginRight: 19,
                          //   }}
                          className="form-control border-0"
                          type="file"
                          id="real-file"
                          accept="image/x-png,image/gif,image/jpeg"
                          onChange={onSelectImage}
                        />
                        <small className="float-left" style={{ color: "red" }}>
                          {imageError}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 mt-4 text-right">Service Name</div>
                  <div className="col-6 mt-3">
                    <TextFieldComponent
                      // className="form-control"
                      error={nameError}
                      helperText={nameError}
                      placeholder="Service Name"
                      onChange={(e) => {
                        setServiceName(e.target.value);
                        setNameError("");
                      }}
                      value={serviceName}
                    />
                  </div>
                </div>
                 */}
                <div className="seller_submit_btn">
                  <button
                    className="mt-5"
                    style={{
                      color: "#fff",
                      background: "#508AEB",
                      border: "none",
                      borderRadius: 5,
                      padding: "13px 19px 11px",
                      marginRight: 19,
                    }}
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                {imageName ? (
                  <img
                    className="img-upload-view services-images"
                    src={constants.BASE_URL.API + "/images/" + imageName}
                    alt={imageName}
                  />
                ) : null}
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
      callAddServicesApiAction: callAddServicesApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AddServices);
