import React from "react";
import LabelWithIcon from "../LabelWithIcon/LabelWithIcon";
import TextFieldComponent from "../TextFieldComponent/TextFieldComponent";
import DropdownComponent from "../CustomDropdown/DropdownComponent";
import PropTypes from "prop-types";
import { SelectRecordLimit } from "../../utils/DemoData";
import CardHeader from "../CardHeader/CardHeader";

export default function CustomeDataTableHeader({
  handleSearch,
  search,
  createLabel,
  handleClickCreateIcon,
  limit,
  onSelectDrop,
  displayLabel,
}) {
  return (
    <div className="custome-data-table-header">
      <TextFieldComponent
        className="col-2 px-0 pl-3 float-right  mb-5"
        placeholder="search..."
        onChange={handleSearch}
        value={search}
      />
      {displayLabel ? (
        <LabelWithIcon
          label={createLabel}
          className="float-right  p-2 mt-2"
          handleClick={handleClickCreateIcon}
        />
      ) : (
        <></>
      )}

      {/* <DropdownComponent
        data={SelectRecordLimit}
        label="show"
        labelClassName="float-left mt-2 mr-2"
        value={limit}
        dropClassName="float-left"
        className="drop-select-limit"
        inputClassName="drop-down-select-limit"
        onSelect={onSelectDrop}
        defaultDropName="10"
      /> */}
    </div>
  );
}
CustomeDataTableHeader.defaultProps = {
  handleSearch: () => {},
  search: "",
  createLabel: "",
  handleClickCreateIcon: () => {},
  limit: "",
  onSelectDrop: () => {},
  displayLabel: true,
};
CustomeDataTableHeader.propTypes = {
  handleSearch: PropTypes.func,
  search: PropTypes.string,
  createLabel: PropTypes.string,
  handleClickCreateIcon: PropTypes.func,
  limit: PropTypes.string,
  onSelectDrop: PropTypes.func,
  displayLabel: PropTypes.bool,
  // searchtext: PropTypes.string.isRequired:PropTypes.string,
};
