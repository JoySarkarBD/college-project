/* eslint-disable react/prop-types */
import "./SearchInput.css";

const SelectNames = ({ names }) => {
  return (
    <>
      <select className='mx-2 py-1 px-2 '>
        <option value='' disabled selected>
          Select Name
        </option>
        {names.map((assigneeName) => (
          <option key={assigneeName} value={assigneeName}>
            {assigneeName}
          </option>
        ))}
      </select>
      <button className='go_btn px-4 py-1 bg-dark text-white rounded-pill'>
        Go
      </button>
    </>
  );
};

export default SelectNames;
