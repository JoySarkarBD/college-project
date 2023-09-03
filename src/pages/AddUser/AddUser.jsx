import React, { useState } from "react";
import "./AddUser.css";

export default function AddUser() {
  const getCurrentDateInput = () => {
    const dateObj = new Date();

    // get the month in this format of 04, the same for months
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();

    const shortDate = `${year}-${month}-${day}`;

    return shortDate;
  };

  // Define state variables for input fields
  const [msid, setMsid] = useState("");
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [team, setTeam] = useState("");
  const [supervisor, setSupervisor] = useState("");

  const [systemEffectiveDate, setSystemEffectiveDate] = useState(
    getCurrentDateInput()
  );
  const [status, setStatus] = useState("");

  const handleForm = (event) => {
    event.preventDefault();
    // Here, you can access the state variables and submit the form data
    const formData = {
      msid,
      user: {
        name,
        email,
      },
      employeeId,
      role,
      team,
      supervisor,
      systemEffectiveDate,
      status,
    };
    console.log(formData); // You can replace this with your form submission logic
  };

  const resetForm = () => {
    event.preventDefault();
    setMsid("");
    setName("");
    setEmployeeId("");
    setEmail("");
    setRole("");
    setTeam("");
    setSupervisor("");
    setSystemEffectiveDate(getCurrentDateInput);
    setStatus("");
  };

  return (
    <div className='container my-5'>
      <div className='title text-center'>
        <h2>Add User</h2>
      </div>
      <form className='addUserForm mt-5'>
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
                  value={msid}
                  onChange={(e) => setMsid(e.target.value)}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Role FIELD*/}
          <div className='col-md-4 mt-3'>
            <div className='mb-3'>
              <label>Role</label>
              <select
                className='form-select formInput'
                aria-label='Default select example'
                value={role}
                onChange={(e) => setRole(e.target.value)}>
                <option selected>Select Role</option>
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
                aria-label='Default select example'
                value={team}
                onChange={(e) => setTeam(e.target.value)}>
                <option selected>Select Team</option>
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
                value={supervisor}
                onChange={(e) => setSupervisor(e.target.value)}
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
                value={systemEffectiveDate}
                onChange={(e) => setSystemEffectiveDate(e.target.value)}
              />
            </div>
          </div>

          {/* Status FIELD*/}
          <div className='col-md-4 mt-3'>
            <div className='mb-3'>
              <label>STATUS</label>
              <select
                className='form-select formInput'
                aria-label='Default select example'
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                <option selected>Select Status</option>
                <option value='Active'>Active</option>
                <option value='In-Active'>In-Active</option>
              </select>
            </div>
          </div>
        </div>

        {/* form submit button */}
        <div className='text-center mt-5 form_buttons gap-2 gap-md-1'>
          {/* SAVE DETAILS BUTTON */}
          <button onClick={handleForm}>Save Details</button>

          {/* SAVE AND ADD ANOTHER BUTTON */}
          <button>SAVE AND ADD ANOTHER</button>

          {/* RESET BUTTON */}
          <button onClick={resetForm}>RESET</button>
        </div>
      </form>
    </div>
  );
}
