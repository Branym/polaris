import React from "react"
import Select from "react-select"

const SelectBox = ({ options, id }) => {
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #ced4da",
      borderRadius: "0",
      width: 200,
      cursor: "pointer",
      height: 30,
      minHeight: 30,
      fontSize: 13,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    indicatorSeparator: (provided, state) => ({
      display: "none",
    }),
    menu: (provided, state) => ({
      ...provided,
      color: "#343a40",
      border: "0 solid #fff",
      borderRadius: 0,
      boxShadow: "0 0 1.2rem rgba(0, 0, 0, .15)",
      zIndex: 10,
    }),
    option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
      ...provided,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? "#3494E6"
        : isFocused
        ? "#eee"
        : null,
      ":active": {
        ...provided[":active"],
        backgroundColor: "#3494E6",
      },
      cursor: "pointer",
    }),
  }

  return (
    <Select
      options={options}
      autosize={true}
      defaultValue={options[0]}
      className="react-select-container"
      classNamePrefix="react-select"
      styles={customSelectStyles}
      isSearchable={false}
      instanceId={id}
    />
  )
}

export default SelectBox
