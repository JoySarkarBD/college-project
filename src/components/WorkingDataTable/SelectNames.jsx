/* eslint-disable react/prop-types */
import "./SearchInput.css";

const SelectNames = ({ names }) => {
  return (
    <>
      <p>VIEW ASSIGNMENTS:</p>
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
    </>
  );
};

export default SelectNames;
