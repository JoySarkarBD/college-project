/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Select from "react-select";
import { v4 } from "uuid";
import "./Admin.css";
import DelegationTable from "./DelegationTable";

const delegateUser = [
  {
    delegatedTo: "Rechard Rachel Ronald",
    role: "Manager",
    start_date: "2023-09-15",
    end_date: "2023-09-23",
    status: "Active",
    id: v4(),
  },
  {
    delegatedTo: "PENA THOMAS WHITE",
    role: "Manager",
    start_date: "2021-05-10",
    end_date: "2021-07-16",
    status: "Inactive",
    id: v4(),
  },
  {
    delegatedTo: "Whide Warren",
    role: "Manager",
    start_date: "2022-02-25",
    end_date: "2023-03-28",
    status: "Inactive",
    id: v4(),
  },
];

const DelegateAccess = () => {
  /* delegate users */
  const [delegateUsers, setDelegateUsers] = useState([...delegateUser]);

  // console.log(delegateUsers);

  // selected value
  const [selectedUser, isSelectedUser] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [users, setUsers] = useState([]);
  // load user data
  const loadUser = async () => {
    try {
      const res = await (await fetch(`http://localhost:3000/users`)).json();
      let modifiedData = [];
      res.forEach((data) => {
        modifiedData.push({
          label: data?.user?.userName,
          value: data?.user?.email,
        });
      });

      setUsers([...modifiedData]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // add delegate user

  const handleForm = async () => {
    event.preventDefault();

    // find selected user
    if (selectedUser) {
      const findUser = await (
        await fetch(`http://localhost:3000/users?user.email=${selectedUser}`)
      ).json();

      if (findUser[0]?.user?.email) {
        const delegateObj = {
          delegatedTo: findUser[0]?.user?.userName,
          role: findUser[0]?.role,
          start_date: fromDate,
          end_date: toDate,
          status: "Inactive",
          id: findUser[0]?.id,
        };

        setDelegateUsers((prev) => [...prev, delegateObj]);
      }
    }
  };

  // change status
  const handelStatus = (userId) => {
    const changeStatusUser = delegateUsers.map((user) => {
      if (user.id !== userId) {
        return user;
      } else {
        return {
          ...user,
          status: "Inactive",
        };
      }
    });

    setDelegateUsers(changeStatusUser);
  };

  return (
    <div className='container my-5'>
      <div className='title text-center'>
        <h2>Delegate Access</h2>
      </div>
      {/* Delegate Access form */}
      <form className='delegate_form mt-5' onSubmit={handleForm}>
        <div className='row'>
          {/* Delegate To FIELD*/}
          <div className='col-md-3'>
            <div className='mb-3'>
              <label>Delegate To</label>
              <Select
                options={users}
                isClearable
                isSearchable
                onChange={(option) => isSelectedUser(option?.value)}
              />
            </div>
          </div>
          {/* From FIELD*/}
          <div className='col-md-3'>
            <div className='mb-3'>
              <label>From</label>
              <input
                type='date'
                className='form-control formInput'
                placeholder='Steven Walker'
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
          </div>
          {/* TO FIELD*/}
          <div className='col-md-3'>
            <div className='mb-3'>
              <label>To</label>
              <input
                type='date'
                className='form-control formInput'
                placeholder='Steven Walker'
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
          {/* button */}
          <div className='col-md-3'>
            <label></label>
            <div style={{ marginTop: "6px" }}>
              <button className='btn-delegate'>Delegate</button>
            </div>
          </div>
        </div>
      </form>

      {/* Delegation Access Past & Active table */}
      <DelegationTable delegateUser={{ delegateUsers, handelStatus }} />
    </div>
  );
};

export default DelegateAccess;
