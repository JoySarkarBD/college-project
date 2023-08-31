/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// this is the column searching function
import { columnFilter } from "../ColumnFilter/ColumnFilter";
import GoToInput from "../Form/GoToInput";
import SearchInput from "../Form/SearchInput";
import SelectNames from "../Form/SelectNames";
import Pagination from "../Pagination/Pagination";
import TableTopbar from "../TableTopbar/TableTopbar";
import dummyData from "./../../../data.json"; // Update the path to your data.json
import "./DataTable.css";

const DataTable = () => {
  // select row state
  const [selectedRows, setSelectedRows] = useState([]);

  // extracting unique names from the dummy json data
  const names = dummyData.map(item => item.assignTo.name);

  // using the useMemo Hook to memoized the value.
  const data = React.useMemo(() => dummyData, []);

  const uniqueAssigneesMap = new Map();
  const uniqueAssigneesArray = [];

  dummyData.forEach(item => {
    const { name, mail } = item.assignTo;
    const key = `${name}-${mail}`;

    if (!uniqueAssigneesMap.has(key)) {
      uniqueAssigneesMap.set(key, true);
      uniqueAssigneesArray.push({ name, mail });
    }
  });

  // ei data diye modal e loop hobe and data show hobe......
  console.log(uniqueAssigneesArray);

  // using the useMemo Hook to memoized the value.
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Filter: columnFilter,
      },
      {
        Header: "ROLE",
        accessor: "role",
        Filter: columnFilter,
      },
      {
        Header: "ASSIGN TO",
        accessor: "assignTo",
        Cell: ({ value, row }) => {
          // editing states
          const [isEditing, setIsEditing] = useState(false);

          // handle edit button
          const handleEditClick = () => {
            setIsEditing(true);
          };

          return (
            <div>
              {/* normal view by default of assignTo cell */}
              {isEditing ? (
                <>
                  <div className='edit_assign_to'>
                    <div className='fw-bolder'>
                      {/* {value.name}
                      <br />
                      {value.mail} */}
                    </div>

                    <button
                      className='edit-btn'
                      type='button'
                      onClick={() => handleEditClick()}
                      data-bs-toggle='modal'
                      data-bs-target='#exampleModal3'>
                      <FiEdit2 />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className='edit_assign_to'>
                    <div className='fw-bolder'>
                      {value.name}
                      <br />
                      {value.mail}
                    </div>

                    <button
                      className='edit-btn'
                      type='button'
                      onClick={() => handleEditClick()}
                      data-bs-toggle='modal'
                      data-bs-target='#exampleModal3'>
                      <FiEdit2 />
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        },
        Filter: columnFilter,
        // custom search filter for the assignTo (for name and mail)
        filter: (rows, id, filterValue) => {
          return rows.filter(row => {
            const assignTo = row.values.assignTo;
            return (
              assignTo.name.toLowerCase().includes(filterValue.toLowerCase()) ||
              assignTo.mail.toLowerCase().includes(filterValue.toLowerCase())
            );
          });
        },
      },
      {
        Header: "DUE DATE",
        accessor: "dueDate",
        Filter: columnFilter,
      },
      {
        Header: "STATUS",
        accessor: "status",
        Filter: columnFilter,
      },
    ],
    [data]
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
    setGlobalFilter,
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
    <div className='px-5 my-5 table-responsive'>
      <div className='row'>
        {/* Go To Input */}
        <div className='col-lg-4 col-md-12 col-sm-12 my-2 text-lg-start text-md-center text-sm-center text-center'>
          <GoToInput
            type='number'
            title='Go to page:'
            gotoPage={gotoPage}
            defaultValue={pageIndex + 1}
          />
        </div>

        <div className='col-lg-4 col-md-12 col-sm-12 my-2 text-lg-center text-md-center text-sm-center text-center'>
          {/* Step 2: Attach event handler */}
          <SelectNames names={names} />
        </div>

        {/* Search Input */}
        <div className='col-lg-4 col-md-12 col-sm-12 my-2 text-lg-end text-md-center text-sm-center text-center'>
          <SearchInput
            type='text'
            title='Search'
            setGlobalFilter={setGlobalFilter}
          />
        </div>
      </div>
      {/* Table topbar */}
      <TableTopbar />
      <table className='table' {...getTableProps()}>
        {/* Mapping the data of header */}
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {/* select all */}
              <th>
                <input
                  type='checkbox'
                  checked={selectedRows.length === page.length}
                  onChange={() => {
                    if (selectedRows.length === page.length) {
                      setSelectedRows([]);
                    } else {
                      setSelectedRows(page.map(row => row.original));
                    }
                  }}
                />
              </th>

              {headerGroup.headers.map((column, index) => (
                <th
                  key={index}
                  scope='col'
                  {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
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
                    type='checkbox'
                    checked={selectedRows.some(
                      selectedRow => selectedRow.id === row.original.id
                    )}
                    onChange={() => {
                      if (
                        selectedRows.some(
                          selectedRow => selectedRow.id === row.original.id
                        )
                      ) {
                        setSelectedRows(
                          selectedRows.filter(
                            selectedRow => selectedRow.id !== row.original.id
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
      <div className='d-flex align-items-center justify-content-center mt-5'>
        <Pagination
          gotoPage={gotoPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          pageIndex={pageIndex}
        />
      </div>

      {/* Modal */}
      <div
        className='modal fade'
        id='exampleModal3'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered '>
          <div className='modal-content'>
            <div className='modal-header border-0'>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div className='modal-body listin_modal_body'>
              <ul>
                <li className='listing_sty'>
                  <span className='ps-1'>
                    <input type='checkbox' name='' id='' />
                  </span>
                  <span className='ps-3'>Select All</span>
                </li>
                {uniqueAssigneesArray.map(item => {
                  console.log(item.email);
                  return (
                    <li key={item.name} className='listing_sty3 py-1'>
                      <div className='listing_sty2'>
                        <span>
                          <input type='checkbox' name='' id='' />
                        </span>
                        <span className='ps-2'>{item.name}</span>
                      </div>
                      <span className='item_mail'>{item?.mail}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
