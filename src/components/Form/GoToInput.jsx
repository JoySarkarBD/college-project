/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./SearchInput.css";

const GoToInput = ({ title, gotoPage, ...attributes }) => {
  return (
    <>
      <label htmlFor='search' className='fs-5'>
        {title}
      </label>
      <input
        className='mx-2 py-1 px-2 w-25'
        {...attributes}
        onChange={e => {
          const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
          gotoPage(pageNumber);
        }}
      />
    </>
  );
};

export default GoToInput;
