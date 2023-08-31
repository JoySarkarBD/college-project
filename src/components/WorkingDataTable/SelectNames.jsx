/* eslint-disable react/prop-types */
import "./SearchInput.css";

const SelectNames = ({ names }) => {
  return (
    <div className="d-flex align-items-center">
      <p className="m-0 fw-bold">VIEW ASSIGNMENTS:</p>
      <select className='mx-2 py-1 px-2 '>
        <option defaultValue='' disabled selected>
          Select Name
        </option>
        {names.map((assigneeName) => (
          <option key={assigneeName} value={assigneeName}>
            {assigneeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectNames;
