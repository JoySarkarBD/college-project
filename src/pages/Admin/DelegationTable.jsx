/* eslint-disable react/prop-types */

export default function DelegationTable({ delegateUser }) {
  const { delegateUsers, handelStatus } = delegateUser;
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
            {delegateUsers.map((user) => {
              const { delegatedTo, role, start_date, end_date, status, id } =
                user;
              // console.log(id);
              return (
                <tr key={id}>
                  <th scope='row'>{delegatedTo.toUpperCase()}</th>
                  <td>{role.toUpperCase()}</td>
                  <td>{new Date(start_date).toLocaleDateString("In-en")}</td>
                  <td>{new Date(end_date).toLocaleDateString("In-en")}</td>
                  <td>{status.toUpperCase()}</td>
                  <td>
                    {status === "Active" && (
                      <button
                        className='btn btn-danger'
                        onClick={() => handelStatus(id)}>
                        End Now
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
