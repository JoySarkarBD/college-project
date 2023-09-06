import { useState } from "react";

export default function DelegationTable() {
  const [status, setStatus] = useState("ACTIVE");
  const handelStatus = () => {
    setStatus("INACTIVE");
  };

  return (
    <div className='delegationTable_container'>
      <div className='title text-center my-5'>
        <h2>Past/Active Delegation</h2>
      </div>
      <div className='delegationTable table-responsive'>
        <table className='table table-bordered caption-top'>
          <thead>
            <tr>
              <th scope='col'>DELEGATED TO</th>
              <th scope='col'>Role</th>
              <th scope='col'>START DATE</th>
              <th scope='col'>END DATE</th>
              <th scope='col'>STATUS</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope='row'>Emily Brown</th>
              <td>MANAGER</td>
              <td>5/3/23</td>
              <td>6/3/23</td>
              <td>{status}</td>
              <td>
                {status === "ACTIVE" && (
                  <button className='btn btn-danger' onClick={handelStatus}>
                    End Now
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <th scope='row'>Emily Brown</th>
              <td>MANAGER</td>
              <td>5/3/23</td>
              <td>6/3/23</td>
              <td>INACTIVE</td>
              <td></td>
            </tr>
            <tr>
              <th scope='row'>Emily Brown</th>
              <td>MANAGER</td>
              <td>5/3/23</td>
              <td>6/3/23</td>
              <td>INACTIVE</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
