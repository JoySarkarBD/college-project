/* eslint-disable react/prop-types */
import Select from "react-select";
import "./Admin.css";
import DelegationTable from "./DelegationTable";

//Option
const options = [
  {
    value: "search",
    label: "Search",
  },
  {
    value: "Rechard Rachel Ronald",
    label: "Rechard Rachel Ronald",
    name: "Rechard Rachel Ronald",
    email: "RRCH@gmail.com",
  },
  {
    value: "PENA THOMAS WHITE",
    label: "PENA THOMAS WHITE",
    name: "PENA THOMAS WHITE",
    email: "Pena@gmail.com",
  },
  {
    value: "Whide Warren",
    label: "Whide Warren",
    name: "Whide Warren",
    email: "WhideWarren@gmail.com",
  },
];

//CustomOption
const CustomOption = ({ innerProps, label, data }) => {
  if (data.value === "search") {
    return (
      <div
        {...innerProps}
        className="px-3 py-1 border-bottom"
        style={{ fontWeight: "bold" }}
      >
        {label}
      </div>
    );
  }
  return (
    <div
      {...innerProps}
      className="d-flex align-items-center g-3 border-bottom"
    >
      <input type="checkbox" className="py-2 mx-3" />
      <div style={{ marginLeft: "5px" }} className="py-2">
        <div>{label}</div>
        <div>{data.email}</div>
      </div>
    </div>
  );
};

const DelegateAccess = () => {
  return (
    <div className="container my-5">
      <div className="title text-center">
        <h2>Delegate Access</h2>
      </div>
      {/* Delegate Access form */}
      <form className="delegate_form mt-5">
        <div className="row">
          {/* Delegate To FIELD*/}
          <div className="col-md-3">
            <div className="mb-3">
              <label>Delegate To</label>
              <Select
                options={options}
                components={{ Option: CustomOption }}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                isMulti
              />
            </div>
          </div>
          {/* From FIELD*/}
          <div className="col-md-3">
            <div className="mb-3">
              <label>From</label>
              <input
                type="date"
                className="form-control formInput"
                placeholder="Steven Walker"
              />
            </div>
          </div>
          {/* TO FIELD*/}
          <div className="col-md-3">
            <div className="mb-3">
              <label>To</label>
              <input
                type="date"
                className="form-control formInput"
                placeholder="Steven Walker"
              />
            </div>
          </div>
          {/* button */}
          <div className="col-md-3">
            <label></label>
            <div style={{ marginTop: "6px" }}>
              <button className="btn-delegate">Delegate</button>
            </div>
          </div>
        </div>
      </form>

      {/* Delegation Access Past & Active table */}
      <DelegationTable />
    </div>
  );
};

export default DelegateAccess;
