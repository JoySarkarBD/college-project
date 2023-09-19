/* eslint-disable react/prop-types */
import "./SearchInput.css";

const SearchInput = ({ title, setGlobalFilter, ...attributes }) => {
  return (
    <>
      <label htmlFor='search' className='fs-5'>
        {title}
      </label>
      <input
        className='mx-2 py-1 px-2'
        {...attributes}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
    </>
  );
};

export default SearchInput;
