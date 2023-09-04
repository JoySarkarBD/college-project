import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import "./../AddUser/AddUser.css";

export default function ModifyUser() {
  const [userData, setUserData] = useState({});
  // const [updateData, setUpdateData] = useState({
  //   id: "",
  //   user: {
  //     userName: "",
  //     email: "",
  //   },
  //   role: "",
  //   supervisorName: "",
  //   teamName: "",
  //   userStatus: "",
  //   ticketsAssigned: "",
  //   date:
  // });
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

  const userDataForm = useRef();

  const { userId } = useParams();

  const fetchDataFromExcel = async () => {
    const response = await fetch("/user_list.xlsx"); // Change the path to your Excel file
    const blob = await response.blob();
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // Assuming your data is in the first sheet
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // Now you have the data from the Excel sheet in sheetData, But before insert it inside of the state we have transform it in another format. SO that the table structure remain perfect.

      const transformedData = sheetData.map((item) => ({
        id: item.id,
        user: {
          userName: item.userName,
          email: item.email,
        },
        role: item.role,
        supervisorName: item.supervisorName,
        teamName: item.team,
        userStatus: item.userStatus,
        ticketsAssigned: item.ticketAssigned,
        date: new Date(item.date).toLocaleDateString(),
      }));

      const singleObj = transformedData.filter((item) => item.id === userId)[0];

      setUserData(singleObj);
    };

    reader.readAsArrayBuffer(blob);
  };

  useEffect(() => {
    fetchDataFromExcel();
  }, []); // Empty dependency array to run the effect only once on mount

  console.log(userData);

  const handleForm = () => {
    event.preventDefault();
  };
  return (
    <div className='container my-5'>
      <div className='title text-center'>
        <h2>Modify User</h2>
      </div>
      <form
        ref={userDataForm}
        className='addUserForm mt-5'
        onSubmit={handleForm}>
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
                value={userData?.user?.userName}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    user: { userName: e.target.value },
                  })
                }
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
                // value={userData?.user?.userName}
                // onChange={(e) =>
                //   setUserData({
                //     ...userData,
                //     user: { userName: e.target.value },
                //   })
                // }
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
                value={userData?.user?.email}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    user: { email: e.target.value },
                  })
                }
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
                value={userData?.role}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    role: e.target.value,
                  })
                }>
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
                value={userData?.teamName}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    teamName: e.target.value,
                  })
                }>
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
                value={userData?.supervisorName}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    supervisorName: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    date: e.target.value,
                  })
                }
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
                value={userData?.userStatus}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    userStatus: e.target.value,
                  })
                }>
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
          <button
            className='px-5'
            onClick={() => {
              userDataForm.current.reset();
            }}>
            RESET
          </button>
        </div>
      </form>
    </div>
  );
}
