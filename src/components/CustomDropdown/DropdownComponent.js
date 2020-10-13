import React from "react";
import { Dropdown } from "react-bootstrap";
import "./DropdownComponent.css";
import PropTypes from "prop-types";

function DropdownComponent({
  data,
  label,
  value,
  drop,
  error,
  className,
  labelClassName,
  filterDropdown,
  noOptionsMessage,
  isDisabled,
  inputClassName,
  defaultDropName,
  dropClassName,
  ...rest
}) {
  return (
    <div
      className={`dropdown-component ${className} ${
        filterDropdown ? "filter" : ""
      }`}
    >
      {label ? (
        <label
          htmlFor={label}
          className={
            !error
              ? `input-label ${labelClassName} ${
                  filterDropdown ? "filter" : ""
                }`
              : `input-label lable-error ${labelClassName} ${
                  filterDropdown ? "filter" : ""
                }`
          }
        >
          {label}
        </label>
      ) : (
        ""
      )}
      <Dropdown
        drop={drop}
        className={`custom-dropdown ${dropClassName}`}
        focusFirstItemOnShow
        {...rest}
      >
        <Dropdown.Toggle
          disabled={isDisabled}
          id="dropdown-custom-components"
          className={
            !error
              ? `custom-dropdown-dispaly  ${inputClassName} ${
                  filterDropdown ? "filter" : ""
                }`
              : `custom-dropdown-dispaly dropdown-error  ${inputClassName} ${
                  filterDropdown ? "filter" : ""
                }`
          }
          variant="link"
        >
          {value === "" && !data.find((item) => item.value === value)
            ? defaultDropName
            : value}
        </Dropdown.Toggle>

        <Dropdown.Menu
          flip={false}
          className={`custom-dropdown-list  ${filterDropdown ? "filter" : ""}`}
        >
          {data.length === 0 ? (
            <Dropdown.Item disabled className="no-option-message">
              {noOptionsMessage}
            </Dropdown.Item>
          ) : (
            data.map((x) => {
              return (
                <Dropdown.Item
                  key={x.id}
                  eventKey={x.id}
                  className={`custom-dropdown-items ${
                    filterDropdown ? "filter" : ""
                  }`}
                  active={x.value === `${value}`}
                >
                  {x.value}
                </Dropdown.Item>
              );
            })
          )}
        </Dropdown.Menu>
      </Dropdown>
      {error ? (
        <label htmlFor={error} className="input-error">
          {error}
        </label>
      ) : (
        ""
      )}
    </div>
  );
}

DropdownComponent.defaultProps = {
  label: "",
  value: "",
  drop: "down",
  filterDropdown: false,
  className: "",
  labelClassName: "",
  noOptionsMessage: "",
  error: "",
  isDisabled: false,
  data: [],
  inputClassName: "",
  dropClassName: "",
  defaultDropName: "",
};
DropdownComponent.propTypes = {
  data: PropTypes.instanceOf(Array),
  label: PropTypes.string,
  value: PropTypes.string,
  drop: PropTypes.oneOf(["up", "left", "right", "down"]),
  filterDropdown: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  noOptionsMessage: PropTypes.string,
  error: PropTypes.string,
  inputClassName: PropTypes.string,
  dropClassName: PropTypes.string,
  isDisabled: PropTypes.bool,
  defaultDropName: PropTypes.string,
};

export default DropdownComponent;
