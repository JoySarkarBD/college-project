import "./AddUser.css";
export default function AddUser() {
  const handleForm = () => {
    event.preventDefault();
  };

  const getCurrentDateInput = () => {
    const dateObj = new Date();

    // get the month in this format of 04, the same for months
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();

    const shortDate = `${year}-${month}-${day}`;

    return shortDate;
  };

  return (
    <div className='container my-5'>
      <div className='title text-center'>
        <h2>Add User</h2>
      </div>
      <form className='addUserForm mt-5' onSubmit={handleForm}>
        <div className='row'>
          {/* MSID FIELD*/}
          <div className='col-md-4 mb-4'>
            <div className='row gx-3 align-items-center'>
              <label className='label'>MSID</label>
              <div className='col-8'>
                <input
                  type='text'
                  className='form-control formInput'
                  placeholder='LJKSHSD'
                />
              </div>
              <div className='col-4'>
                <button type='submit' className='btn btn_input'>
                  CHECK
                </button>
              </div>
            </div>
          </div>

          {/* NAME FIELD*/}
          <div className='col-md-4 mb-4'>
            <div className='mb-3'>
              <label>NAME</label>
              <input
                type='text'
                className='form-control formInput'
                placeholder='PETERPARKER'
              />
            </div>
          </div>

          {/* Employee ID FIELD*/}
          <div className='col-md-4'>
            <div className='mb-3'>
              <label>Employee ID</label>
              <input
                type='text'
                className='form-control formInput'
                placeholder='PETERPARKER'
              />
            </div>
          </div>

          {/* Email FIELD*/}
          <div className='col-md-4 mt-3'>
            <div className='mb-3'>
              <label>Email</label>
              <input
                type='email'
                className='form-control formInput'
                placeholder='peterparker@gmail.com'
              />
            </div>
          </div>

          {/* Role FIELD*/}
          <div className='col-md-4 mt-3'>
            <div className='mb-3'>
              <label>Role</label>
              <select
                className='form-select formInput'
                aria-label='Default select example'>
                <option selected disabled>
                  Select Role
                </option>
                <option value='Technician'>Technician</option>
                <option value='Operator'>Operator</option>
                <option value='Manager'>Manager</option>
              </select>
            </div>
          </div>

          {/* Team FIELD*/}
          <div className='col-md-4 mt-3'>
            <div className='mb-3'>
              <label>Team</label>
              <select
                className='form-select formInput'
                aria-label='Default select example'>
                <option selected disabled>
                  Select Team
                </option>
                <option value='AUDITOR'>AUDITOR</option>
                <option value='RE-PROCESSOR'>Re-Processor</option>
              </select>
            </div>
          </div>

          {/* SUPERVISOR FIELD*/}
          <div className='col-md-4 mt-3'>
            <div className='mb-3'>
              <label>SUPERVISOR</label>
              <input
                type='text'
                className='form-control formInput'
                placeholder='Steven Walker'
              />
            </div>
          </div>

          {/* System Effective Date FIELD*/}
          <div className='col-md-4 mt-3'>
            <div className='mb-3'>
              <label>System Effective Date</label>
              <input
                type='date'
                className='form-control formInput'
                placeholder='Steven Walker'
                defaultValue={getCurrentDateInput()}
              />
            </div>
          </div>

          {/* Status FIELD*/}
          <div className='col-md-4 mt-3'>
            <div className='mb-3'>
              <label>STATUS</label>
              <select
                className='form-select formInput'
                aria-label='Default select example'>
                <option selected disabled>
                  Select Status
                </option>
                <option value='Active'>Active</option>
                <option value='In-Active'>In-Active</option>
              </select>
            </div>
          </div>
        </div>

        {/* form submit button */}
        <div className='text-center mt-5 form_buttons gap-2 gap-md-1'>
          {/* SAVE DETAILS BUTTON */}
          <button>Save Details</button>

          {/* SAVE AND ADD ANOTHER BUTTON */}
          <button>SAVE AND ADD ANOTHER</button>

          {/* RESET BUTTON */}
          <button>RESET</button>
        </div>
      </form>
    </div>
  );
}
