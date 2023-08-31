import "./Admin.css";
import DelegationTable from "./DelegationTable";
const DelegateAccess = () => {
  return (
    <div className="container my-5">
      <div className="title text-center">
        <h2>Delegate Access</h2>
      </div>
      {/* Delegate Access form */}
      <form className="delegate_form mt-5">
        <div className="row">
          {/* System Effective Date FIELD*/}
          <div className="col-md-3">
            <div className="mb-3">
              <label>System Effective Date</label>
              <input
                type="date"
                className="form-control formInput"
                placeholder="Steven Walker"
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
            <div className="mt-2">
              <button className="btn btn-delegate">Delegate</button>
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
