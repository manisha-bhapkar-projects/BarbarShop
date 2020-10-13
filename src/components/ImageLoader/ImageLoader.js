import React, { useState } from "react";
import PropTypes from "prop-types";
import Placeholder from "../../images/certificat.jpg";
import Spinner from "../../images/Spinner.gif";
import constants from "../../utils/constants";

const ImageLoader = ({ className, src, alt, ...rest }) => {
  const [isLoading, setIsLoading] = useState(false);
  // myRef = React.createRef();
  return (
    <img
      className={`${className}`}
      onError={() => {
        setIsLoading(true);
      }}
      onLoadStart={() => {
        setIsLoading(true);
      }}
      onLoadEnd={()=>{
        setIsLoading(false);

      }}
      // src={
      //   barber.certificate
      //     ? `${constants.BASE_URL.API}/images/${barber.certificate}`
      //     : Placeholder
      src={
        src
          ? `${constants.BASE_URL.API}/images/${src}`
          : isLoading
          ? Spinner
          : Placeholder
      }
      alt={alt}
      {...rest}
    />
  );
};

ImageLoader.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
};

ImageLoader.defaultProps = {
  className: "",
  alt: "images",
};

export default ImageLoader;
