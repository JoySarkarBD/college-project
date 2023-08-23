/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { columnFilter } from "../ColumnFilter/ColumnFilter";
import dummyData from "./../../../data.json";

const DataTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const uniqueNames = Array.from(
    new Set(dummyData.map((item) => item.assignTo.name))
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
        Header: "Role",
        accessor: "role",
        Filter: columnFilter,
      },
      {
        Header: "Assigned To",
        accessor: "assignTo",
        Cell: ({ value, row }) => {
          const [isEditing, setIsEditing] = useState(false);
          const [editedName, setEditedName] = useState(value.name);
          const [editedEmail, setEditedEmail] = useState(value.mail);

          // Preprocess the data to create a unique list of assignee names
          const uniqueAssigneeNames = [
            ...new Set(data.map((row) => row.assignTo.name)),
          ];
          const handleEditClick = () => {
            setIsEditing(true);
            setEditedName(value.name);
            setEditedEmail(value.mail);
          };

          const handleSaveClick = () => {
            // Update the value in the row data or take any other action you need
            const updatedData = data.map((rowData) =>
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
                <div>
                  <input
                    type='text'
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                  <select
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}>
                    {uniqueAssigneeNames.map((assigneeName) => (
                      <option key={assigneeName} value={assigneeName}>
                        {assigneeName}
                      </option>
                    ))}
                  </select>
                  <button onClick={handleSaveClick}>Save</button>
                </div>
              ) : (
                <div>
                  <div>
                    {value.name}
                    <br />
                    {value.mail}
                  </div>
                  <button onClick={handleEditClick}>Edit</button>
                </div>
              )}
            </div>
          );
        },
        Filter: columnFilter,
        filter: (rows, id, filterValue) => {
          return rows.filter((row) => {
            const assignTo = row.values.assignTo;
            return (
              assignTo.name.toLowerCase().includes(filterValue.toLowerCase()) ||
              assignTo.mail.toLowerCase().includes(filterValue.toLowerCase())
            );
          });
        },
      },
      {
        Header: "Due Date",
        accessor: "dueDate",
        Filter: columnFilter,
      },
      {
        Header: "Status",
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
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <span>
          Go to page:{" "}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <span>
          {/* Step 2: Attach event handler */}
          <select>
            <option value=''>Select Name</option>
            {uniqueNames.map((assigneeName) => (
              <option key={assigneeName} value={assigneeName}>
                {assigneeName}
              </option>
            ))}
          </select>
          <button>Go</button>
        </span>
        <input
          type='text'
          placeholder='Search...'
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
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
                      setSelectedRows(page.map((row) => row.original));
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
                      (selectedRow) => selectedRow.id === row.original.id
                    )}
                    onChange={() => {
                      if (
                        selectedRows.some(
                          (selectedRow) => selectedRow.id === row.original.id
                        )
                      ) {
                        setSelectedRows(
                          selectedRows.filter(
                            (selectedRow) => selectedRow.id !== row.original.id
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
      <div>
        <button onClick={() => gotoPage(0)} disabled={pageIndex === 0}>
          {"<<"}
        </button>
        <button
          onClick={() => gotoPage(pageIndex - 1)}
          disabled={pageIndex === 0}>
          {"<"}
        </button>
        <button
          onClick={() => gotoPage(pageIndex + 1)}
          disabled={pageIndex >= page.length - 1}>
          {">"}
        </button>
        <button
          onClick={() => gotoPage(page.length - 1)}
          disabled={pageIndex >= page.length - 1}>
          {">>"}
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {page.length}
          </strong>{" "}
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DataTable;
