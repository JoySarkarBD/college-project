import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./../AddUser/AddUser.css";

/* 
  id: "",
  userName: "",
  email: "",
  role: "",
  supervisorName: "",
  teamName: "",
  userStatus: "",
  ticketsAssigned: "",
  date:"",
  }
  */

// eslint-disable-next-line no-unused-vars
const getCurrentDateInput = (date) => {
  const dateObj = new Date(date);

  // get the month in this format of 04, the same for months
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDate()).slice(-2);
  const year = dateObj.getFullYear();

  const shortDate = `${year}-${month}-${day}`;

  return shortDate;
};

export default function ModifyUser() {
  const [userData, setUserData] = useState({
    id: "",
    user: {
      userName: "",
      email: "",
    },
    role: "",
    supervisorName: "",
    teamName: "",
    userStatus: "",
    date: "",
  });

  // Store the original data
  const [originalUserData, setOriginalUserData] = useState({});

  const { userId } = useParams();

  // fetching data from the excel sheet by userId
  useEffect(() => {
    fetch(`http://localhost:3000/users?id=${userId}`)
      .then((response) => {
        // Check if the response status is OK (200)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Parse the JSON response
        return response.json();
      })
      .then((data) => {
        // Handle the JSON data here
        setUserData(data[0]);
        setOriginalUserData(data[0]);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [userId]);

  // Handle changes in the "NAME" input field.
  const handleUserNameChange = (e) => {
    setUserData({
      ...userData,
      user: {
        ...userData.user,
        userName: e.target.value,
      },
    });
  };

  // Handle changes in the "Email" input field.
  const handleEmailChange = (e) => {
    setUserData({
      ...userData,
      user: {
        ...userData.user,
        email: e.target.value,
      },
    });
  };

  // Handle changes in the "Role" dropdown select.
  const handleRoleChange = (e) => {
    setUserData({
      ...userData,
      role: e.target.value,
    });
  };

  // Handle changes in the "Team" dropdown select.
  const handleTeamChange = (e) => {
    setUserData({
      ...userData,
      teamName: e.target.value,
    });
  };

  // Handle changes in the "SUPERVISOR" input field.
  const handleSupervisorChange = (e) => {
    setUserData({
      ...userData,
      supervisorName: e.target.value,
    });
  };

  // Handle changes in the "System Effective Date" input field.
  const handleDateChange = (e) => {
    setUserData({
      ...userData,
      date: e.target.value,
    });
  };

  // Handle changes in the "STATUS" dropdown select.
  const handleStatusChange = (e) => {
    setUserData({
      ...userData,
      userStatus: e.target.value,
    });
  };

  // submit updated data
  const handleForm = () => {
    event.preventDefault();
  };

  // Reset the form data to the original data
  const handleReset = () => {
    event.preventDefault();
    setUserData(originalUserData);
  };

  return (
    <div className='container my-5'>
      <div className='title text-center'>
        <h2>Modify User</h2>
      </div>
      <form className='addUserForm mt-5' onSubmit={handleForm}>
        <div className='row'>
          {/* MSID FIELD*/}
          <div className='col-md-4 mb-4'>
            <div className='row gx-3 align-items-center'>
              <label className='label'>MSID</label>
              <div className='col-12'>
                <input
                  type='text'
                  className='form-control formInput'
                  placeholder='LJKSHSD'
                  disabled
                  defaultValue={userData?.id}
                />
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
                value={userData.user.userName}
                onChange={handleUserNameChange}
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
                value={userData.user.email}
                onChange={handleEmailChange}
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
                value={userData.role}
                onChange={handleRoleChange}>
                <option value=''>Select Role</option>
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
                value={userData.teamName}
                onChange={handleTeamChange}>
                <option value=''>Select Team</option>
                <option value='Auditor'>AUDITOR</option>
                <option value='Re-Processor'>Re-Processor</option>
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
                value={userData.supervisorName}
                onChange={handleSupervisorChange}
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
                value={userData.date}
                onChange={handleDateChange}
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
                value={userData.userStatus}
                onChange={handleStatusChange}>
                <option value='Active'>Active</option>
                <option value='InActive'>In-Active</option>
              </select>
            </div>
          </div>
        </div>

        {/* form submit button */}
        <div className='text-center mt-5 form_buttons gap-2 gap-md-1'>
          {/* SUBMIT BUTTON */}
          <button className='px-5' type='submit'>
            SUBMIT
          </button>

          {/* RESET BUTTON */}
          <button className='px-5' onClick={handleReset}>
            RESET
          </button>
        </div>
      </form>
    </div>
  );
}
