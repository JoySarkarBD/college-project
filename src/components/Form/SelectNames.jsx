/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { v4 } from "uuid";
import "./SearchInput.css";

const SelectNames = ({ selectedName }) => {
  const { names, handleSelect, batchUpdate } = selectedName;

  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = async (event) => {
    const selectedOption = event.target.value;

    setSelectedValue(selectedOption);

    const res = await (
      await fetch(
        `http://localhost:3000/assignUserList?assignTo.mail=${selectedOption}`
      )
    ).json();
    handleSelect(res[0]); // Pass the selected value to the parent component
  };

  return (
    <>
      <select
        className='mx-2 py-1 px-2'
        value={selectedValue}
        onChange={handleSelectChange}>
        <option value=''>Select Name</option>
        {names.map((user) => {
          return (
            <option key={v4()} value={user?.assignTo?.mail}>
              {user?.assignTo?.name}
            </option>
          );
        })}

        {/* <option value='sofia@gmail.com'>Sofia</option> */}
      </select>
      <button
        className='go_btn px-4 py-1 bg-dark text-white rounded-pill'
        onClick={batchUpdate}>
        Go
      </button>
    </>
  );
};

export default SelectNames;
