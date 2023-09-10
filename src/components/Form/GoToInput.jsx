/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"; // Import React and useState
import "./SearchInput.css";

const GoToInput = ({ pageIndex, totalPages, gotoPage }) => {
  return (
    <>
      <label htmlFor='search' className='fs-5'>
        GO TO PAGE:
      </label>
      <input
        className='mx-2 py-1 px-2 w-25 number-inp'
        type='number'
        min={1}
        max={totalPages}
        value={pageIndex + 1}
        onChange={(e) => {
          const pageNumber = parseInt(e.target.value);
          if (
            !isNaN(pageNumber) &&
            pageNumber >= 1 &&
            pageNumber <= totalPages
          ) {
            gotoPage(pageNumber - 1);
          }
        }}
      />
    </>
  );
};

export default GoToInput;
