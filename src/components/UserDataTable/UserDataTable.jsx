/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import "./UserDataTable.css";

// this is the column searching function
import { AiOutlinePlus } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import userManageData from "../../../userList.json";
import { columnFilter } from "../ColumnFilter/ColumnFilter";
import emptyFilter from "../ColumnFilter/EmptyFilter";
import GoToInput from "../Form/GoToInput";
import Pagination from "../Pagination/Pagination";
import AdminTableTopbar from "../TableTopbar/AdminTableTopbar";

const UserDataTable = () => {
  // select row state
  const [selectedRows, setSelectedRows] = useState([]);

  // extracting unique names from the dummy json data
  // const userNames = userManageData.map((item) => item.name.userName);

  // using the useMemo Hook to memoized the value.
  const data = React.useMemo(() => userManageData, []);

  const uniqueNamesMap = new Map();
  const uniqueNamesArray = [];

  userManageData.forEach(item => {
    const { userName, email } = item.name;
    const key = `${userName}-${email}`;

    if (!uniqueNamesMap.has(key)) {
      uniqueNamesMap.set(key, true);
      uniqueNamesArray.push({ userName, email });
    }
  });

  // using the useMemo Hook to memoized the value.
  const columns = React.useMemo(
    () => [
      {
        Header: "MSID",
        accessor: "id",
        Filter: columnFilter,
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value, row }) => {
          return (
            <div>
              {/* normal view by default of user name cell */}
              <div className='edit_assign_to'>
                <div className='text-black'>
                  <strong> {value.userName}</strong>
                  <br />
                  {value.email}
                </div>
              </div>
            </div>
          );
        },
        Filter: columnFilter,
        // custom search filter for the assignTo (for name and mail)
        filter: (rows, id, filterValue) => {
          return rows.filter(row => {
            const name = row.values.name;
            return (
              name.userName.toLowerCase().includes(filterValue.toLowerCase()) ||
              name.email.toLowerCase().includes(filterValue.toLowerCase())
            );
          });
        },
      },
      {
        Header: "Role",
        accessor: "role",
        Filter: columnFilter,
      },
      {
        Header: "Supervisor Name",
        accessor: "supervisorName",
        Filter: columnFilter,
      },
      {
        Header: "Team Name",
        accessor: "teamName",
        Filter: columnFilter,
      },
      {
        Header: "User Status",
        accessor: "userStatus",
        Filter: columnFilter,
      },
      {
        Header: "Tickets Assigned",
        accessor: "ticketsAssigned",
        Filter: columnFilter,
      },

      {
        Header: "ACTIONS",
        accessor: "ACTIONS",
        Filter: emptyFilter,
        Cell: ({ row }) => {
          return (
            <div>
              <Link to="/manage-user/modify-user">
                <button // Define your edit action function
                  className="btn-edit"
                >
                  Edit
                </button>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  // useTable functionalities from react-table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div className="px-5 my-5 table-responsive">
      <div className="row table_top_area">
        {/* Go To Input */}
        <div className="col-lg-6 col-md-12 col-sm-12 my-2 text-lg-start text-md-center text-sm-center text-center">
          <GoToInput
            type="number"
            title="Go to page:"
            gotoPage={gotoPage}
            defaultValue={pageIndex + 1}
          />
        </div>

        <div className="col-lg-6 col-md-12 col-sm-12 my-2 text-lg-end text-md-center text-sm-center text-center">
          <NavLink to="/manage-user/add-user">
            <button className=" border-0 bg-transparent add_user_btn">
              Add User
              <AiOutlinePlus className="user_add_icon" />
            </button>
          </NavLink>
        </div>
      </div>

      {/* Table topbar */}
      <AdminTableTopbar />

      <table className="table" {...getTableProps()}>
        {/* Mapping the data of header */}
        <thead>
          {headerGroups?.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {/* select all */}
              <th>
                <input
                  type="checkbox"
                  checked={selectedRows.length === page.length}
                  onChange={() => {
                    if (selectedRows.length === page.length) {
                      setSelectedRows([]);
                    } else {
                      setSelectedRows(page.map((row) => row.original));
                    }
                  }}
                />
              </th>
              {headerGroup?.headers?.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                  <div>
                    {column?.canFilter ? column?.render("Filter") : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* Body */}
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              // Mapping the table body row data
              <tr key={index} {...row.getRowProps()}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.some(
                      (selectedRow) =>
                        selectedRow.id === row.original.id
                    )}
                    onChange={() => {
                      if (
                        selectedRows.some(
                          (selectedRow) =>
                            selectedRow.id === row.original.id
                        )
                      ) {
                        setSelectedRows(
                          selectedRows.filter(
                            (selectedRow) =>
                              selectedRow.id !== row.original.id
                          )
                        );
                      } else {
                        setSelectedRows([...selectedRows, row.original]);
                      }
                    }}
                  />
                </td>
                {row.cells.map((cell, index) => (
                  <td key={index} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex align-items-center justify-content-center mt-5">
        <Pagination
          gotoPage={gotoPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          pageIndex={pageIndex}
        />
      </div>
    </div>
  );
};

export default UserDataTable;