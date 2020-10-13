import React from "react";
// import { Multiselect } from "multiselect-react-dropdown";
import Multiselect from "react-multi-select-component";
import "./DropdownComponentWithSearchBar.scss";
import PropTypes from "prop-types";

function DropdownComponentWithMultiSelect({
  data,
  label,
  value,
  // drop,
  isLoading,
  error,
  className,
  labelClassName,
  filterDropdown,
  // noOptionsMessage,
  // selectedValue,
  onSelect,
  // onRemove,
  // isDisabled,
  ...rest
}) {

  // const selected = [
  //   { id: 1, value: "Hair Style" },
  //   // { id: 2, value: "Shaving" },
  //   // { id: 3, value: "Makeup" },
  //   // { id: 4, value: "Spa" },
  // ];
  // const customValueRenderer = (selected, _options) => {
  //   return selected.length
  //     ? selected.map(({ label }) => "✔️ " + label)
  //     : "😶 No Items Selected";
  // };
  return (
    <div
      className={`dropdown-component-with-search-bar ${className} ${
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
      <Multiselect
        options={data} // Options to display in the dropdown
        // selectedValues={selectedValue} // Preselected value to persist in dropdown
        onChange={onSelect} // Function will trigger on select event
        // onRemove={onRemove} // Function will trigger on remove event
        value={value}
        // value={[
        //   { label: "Hair Style", value: "Hair Style" },
        //   { label: "Shaving", value: "Shaving" },
        // ]}
        focusSearchOnOpen={true}
        hasSelectAll={true}
        isLoading={isLoading}
        shouldToggleOnHover={true}
        overrideStrings={{
          selectSomeItems: "Select....",
          allItemsAreSelected: "All Items are Selected",
          selectAll: "Select All Services",
          search: "Search....",
        }}
      />
      {/* <Dropdown
        drop={drop}
        className="custom-dropdown"
        focusFirstItemOnShow
        {...rest}
      >
        <Dropdown.Toggle
          id="dropdown-custom-components"
          className={
            !error
              ? `custom-dropdown-dispaly ${filterDropdown ? 'filter' : ''}`
              : `custom-dropdown-dispaly dropdown-error ${
                  filterDropdown ? 'filter' : ''
                }`
          }
          variant="link"
          disabled={isDisabled}
        >
          {value === '' || !data.find(item => item.value === value)
            ? 'Select'
            : value}
        </Dropdown.Toggle>

        <Dropdown.Menu
          as={CustomMenu}
          flip={false}
          className={`custom-dropdown-list ${filterDropdown ? 'filter' : ''}`}
        >
          {data.length === 0 ? (
            <Dropdown.Item disabled className="no-option-message">
              {noOptionsMessage}
            </Dropdown.Item>
          ) : (
            data.map(x => {
              return (
                <Dropdown.Item
                  key={x.id}
                  eventKey={x.id}
                  className={`custom-dropdown-items  ${
                    filterDropdown ? 'filter' : ''
                  }`}
                  active={x.value === value}
                >
                  {x.value}
                </Dropdown.Item>
              );
            })
          )}
        </Dropdown.Menu>
      </Dropdown>
      
       */}
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

DropdownComponentWithMultiSelect.defaultProps = {
  label: "",
  value: "",
  drop: "down",
  filterDropdown: false,
  className: "",
  labelClassName: "",
  noOptionsMessage: "",
  error: "",
  isDisabled: false,
  isLoading: true,
  selectedValue: () => {},
  onSelect: () => {},
  onRemove: () => {},
};
DropdownComponentWithMultiSelect.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  noOptionsMessage: PropTypes.string,
  error: PropTypes.string,
  isDisabled: PropTypes.bool,
  selectedValue: PropTypes.func,
  onSelect: PropTypes.func,
  onRemove: PropTypes.func,
};

export default DropdownComponentWithMultiSelect;
