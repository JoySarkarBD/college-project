/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react"; // Import React and useState
import "./SearchInput.css";

const GoToInput = ({ title, gotoPage }) => {
  // Initialize state for the input value
  const [inputValue, setInputValue] = useState(1);

  const handleInputChange = (e) => {
    const rawValue = e.target.value;
    let pageNumber = parseInt(rawValue);

    if (isNaN(pageNumber) || pageNumber <= 0) {
      setInputValue(""); // Clear the input field for non-numeric or negative input
      gotoPage(1); // Set to page 1 for non-numeric or negative input
    } else {
      setInputValue(pageNumber); // Update the input value
      gotoPage(pageNumber - 1); // Adjusted to zero-based index
    }
  };

  return (
    <>
      <label htmlFor='search' className='fs-5'>
        GO TO PAGE
      </label>
      <input
        className='mx-2 py-1 px-2 w-25 number-inp'
        type='number'
        min={1}
        value={inputValue} // Use the controlled component value
        onChange={handleInputChange}
      />
    </>
  );
};

export default GoToInput;
