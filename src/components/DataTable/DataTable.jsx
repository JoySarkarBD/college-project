/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FiEdit2 } from 'react-icons/fi';
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { columnFilter } from "../ColumnFilter/ColumnFilter";
import GoToInput from "../Form/GoToInput";
import SearchInput from "../Form/SearchInput";
import SelectNames from "../Form/SelectNames";
import Pagination from "../Pagination/Pagination";
import TableTopbar from "../TableTopbar/TableTopbar";
import dummyData from "./../../../data.json"; // Update the path to your data.json
import "./DataTable.css";

const DataTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const uniqueNames = Array.from(
    new Set(dummyData.map(item => item.assignTo.name))
  );

  const data = React.useMemo(() => dummyData, []);

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
          const [isEditing, setIsEditing] = useState(false);
          const [editedName, setEditedName] = useState(value.name);
          const [editedEmail, setEditedEmail] = useState(value.mail);

          const handleEditClick = () => {
            setIsEditing(true);
            setEditedName(value.name);
            setEditedEmail(value.mail);
          };

          const handleSaveClick = () => {
            // Update the value in the row data or take any other action you need
            const updatedData = data.map(rowData =>
              rowData.id === row.original.id
                ? {
                    ...rowData,
                    assignTo: { name: editedName, mail: editedEmail },
                  }
                : rowData
            );
            // Update your data state or data source with updatedData
            setIsEditing(false);
          };

          return (
            <div>
              {isEditing ? (
                <div className="edit_box">
                  <input
                    type='text'
                    value={editedEmail}
                    onChange={e => setEditedEmail(e.target.value)}
                  />
                  <select
                    value={editedName}
                    onChange={e => setEditedName(e.target.value)}>
                    {uniqueNames.map(assigneeName => (
                      <option key={assigneeName} value={assigneeName}>
                        {assigneeName}
                      </option>
                    ))}
                  </select>
                  <button onClick={handleSaveClick} className="save_btn">Save</button>
                </div>
              ) : (
                <div className="edit_assign_to">
                  <div className="fw-bolder">
                    {value.name}
                    <br />
                    {value.mail}
                  </div>
                  <button className="edit-btn" onClick={handleEditClick}>
                    <FiEdit2/>
                  </button>
                </div>
              )}
            </div>
          );
        },
        Filter: columnFilter,
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
      <div className='d-flex justify-content-between align-items-center'>
        {/* Go To Input */}
        <div className='ms-2'>
          <GoToInput
            type='number'
            title='Go to page:'
            gotoPage={gotoPage}
            defaultValue={pageIndex + 1}
          />
        </div>

        <span>
          {/* Step 2: Attach event handler */}
          <SelectNames uniqueNames={uniqueNames} />
        </span>

        {/* Search Input */}
        <div>
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
        {/* Header */}
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
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
    </div>
  );
};

export default DataTable;
