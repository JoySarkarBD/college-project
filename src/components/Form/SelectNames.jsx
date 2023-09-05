/* eslint-disable react/prop-types */
import { v4 } from "uuid";
import "./SearchInput.css";

const SelectNames = ({ names }) => {
  return (
    <>
      <select className='mx-2 py-1 px-2 '>
        <option value=''>Select Name</option>
        {names.map((name) => (
          <option key={v4()} value={name}>
            {name?.name}
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
