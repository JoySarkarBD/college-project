/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./SearchInput.css";

const GoToInput = ({ title, gotoPage, ...attributes }) => {
  const handleInputChange = (e) => {
    const rawValue = e.target.value;
    let pageNumber = parseInt(rawValue);

    if (isNaN(pageNumber) || pageNumber <= 0) {
      gotoPage(0); // Default to page 1 for non-numeric or negative input
    } else {
      gotoPage(pageNumber - 1); // Adjusted to zero-based index
    }
  };

  return (
    <>
      <label htmlFor='search' className='fs-5'>
        {title}
      </label>
      <input
        className='mx-2 py-1 px-2 w-25 number-inp'
        {...attributes}
        onChange={handleInputChange}
      />
    </>
  );
};

export default GoToInput;
