import React from 'react';
import PropTypes from 'prop-types';
import './CardHeader.scss';
import LabelWithIcon from '../LabelWithIcon/LabelWithIcon';
// import LabelWithIcon from '../LabelWithIcon/LabelWithIcon';
import plushIcon from '../../images/plus.png';
// import downloadPdfImage from '../../images/DownloadArrow/download_file.png';

/**
 * CardHeader: card header with label and small line below it
 * @param {string} props.title Show Card Header Title
 * @param {bool} props.searchbox Status weather to show card header or not
 */

const CardHeader =  props => {
  const {
    title,
    searchbox,
    lable,
    handleClickCreateIcon,
    searchText,
    onSearchListner,
    createLabelName,
    SearchPlaceholder,
  } = props;
  return (
    <div className="card-header-div">
      <div className="header-title align-self-center">
        <div className="card-header-title">{title} </div>
        <div className="card-header-bottom-border" />
      </div>
      <div className="header-right">
        {lable ? (
          <div className="label-icon mr-0">
            <LabelWithIcon
              className="add-more-button"
              label={createLabelName}
              icon={plushIcon}
              handleClick={handleClickCreateIcon}
            />
          </div>
        ) : null}
        {searchbox ? (
          <div className="search-tab">
            <input
              id="search-header"
              className="search-bar"
              type="text"
              placeholder={SearchPlaceholder}
              value={searchText}
              onChange={onSearchListner}
              autoComplete="off"
            />
          </div>
        ) : null}
        
      </div>
    </div>
  );
};
export default CardHeader;

CardHeader.defaultProps = {
  searchbox: false,
  lable: false,
  createLabelName: '',
  onSearchListner: () => {},
  searchText: '',
  // path: '',
  handleClickCreateIcon: () => {},
  SearchPlaceholder:'Search...',

};

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  searchbox: PropTypes.bool,
  lable: PropTypes.bool,
  onSearchListner: PropTypes.func,
  createLabelName: PropTypes.string,
  searchText: PropTypes.string,
  handleClickCreateIcon: PropTypes.func,
  SearchPlaceholder:PropTypes.string,

  // path: PropTypes.string,
};
