import React, { useState } from "react";
import "./AddUser.css";

/* 
// During using the json inside the code I have re-structure the data in this formate
{
  "id": "JDILKGFU",
  "user": {
    "userName": "John Doe",
    "email": "johndeo@example.com"
  },
  "role": "Manager",
  "supervisorName": "Rahul Bose",
  "teamName": "Auditor",
  "userStatus": "Active",
  "ticketsAssigned": 40
}
*/

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

  // error state
  const [msidErr, setMsidError] = useState("");
  const [msIdAvailable, setMsIdAvailable] = useState(false);

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
      id: msid.toUpperCase(),
      user: {
        userName: name,
        email,
      },
      employeeId: employeeId.toUpperCase(),
      role,
      teamName: team,
      supervisorName: supervisor,
      date: systemEffectiveDate,
      userStatus: status,
      ticketsAssigned: 0,
    };

    // console.log(formData); // You can replace this with your form submission logic

    /* add from in database through fetch api */
    fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.id) {
          alert(` ${data?.user?.userName} successfully added.`);
        }
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetForm = () => {
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

  const handleMsIdCheck = async () => {
    try {
      const isExistId = await (
        await fetch(`http://localhost:3000/users?id=${msid.toUpperCase()}`)
      ).json();

      if (isExistId.length > 0) {
        setMsidError(`${msid} is already exist`);
      } else {
        setMsIdAvailable(true);
      }
    } catch (error) {
      console.log(error.message, "this error from msid checking");
    }
  };

  // console.log(msidErr.split(" ")[0] === msid);

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
                  value={msid}
                  onChange={(e) => setMsid(e.target.value)}
                />
                <p className='text-danger'>
                  {msid.length > 0 && msidErr && msidErr.split(" ")[0] === msid
                    ? msidErr
                    : ""}
                </p>
                {msIdAvailable &&
                msid.length > 0 &&
                msidErr.split(" ")[0] !== msid ? (
                  <p className='text-success'>MsId is available </p>
                ) : (
                  ""
                )}
              </div>
              <div className='col-4'>
                <button
                  type='button'
                  className='btn btn_input'
                  onClick={handleMsIdCheck}>
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
                <option>Select Role</option>
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
                <option>Select Team</option>
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
                value={systemEffectiveDate || getCurrentDateInput()}
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
                <option>Select Status</option>
                <option value='Active'>Active</option>
                <option value='In-Active'>In-Active</option>
              </select>
            </div>
          </div>
        </div>

        {/* form submit button */}
        <div className='text-center mt-5 form_buttons gap-2 gap-md-1'>
          {/* SAVE DETAILS BUTTON */}
          <button type='submit' disabled={msidErr.split(" ")[0] === msid}>
            Save Details
          </button>

          {/* SAVE AND ADD ANOTHER BUTTON */}
          <button>SAVE AND ADD ANOTHER</button>

          {/* RESET BUTTON */}
          <button type='button' onClick={resetForm}>
            RESET
          </button>
        </div>
      </form>
    </div>
  );
}
