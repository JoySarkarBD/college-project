/* eslint-disable react/prop-types */
import "./SearchInput.css";

const SelectNames = ({ names, selectedName, setSelectedName }) => {
  return (
    <div className='d-flex align-items-center'>
      <p className='m-0 fw-bold'>VIEW ASSIGNMENTS:</p>
      <select
        className='mx-2 py-1 px-2 '
        value={selectedName}
        onChange={(e) => setSelectedName(e.target.value)}>
        <option value=''>Select Name</option>
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
