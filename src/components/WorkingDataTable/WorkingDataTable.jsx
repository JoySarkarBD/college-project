/* eslint-disable react/prop-types */
import React, { useState } from "react";
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
import Pagination from "../Pagination/Pagination";
import TableTopbar from "../TableTopbar/TableTopbar";
import dummyData from "./../../../workQueue.json"; // Update the path to your data.json
import SelectNames from "./SelectNames";

const WorkingDataTable = () => {
  // select row state
  const [selectedRows, setSelectedRows] = useState([]);
  console.log(selectedRows);
  // extracting unique names from the dummy json data
  const names = dummyData.map(item => item.assignTo.name);

  // using the useMemo Hook to memoized the value.
  const data = React.useMemo(() => dummyData, []);

  // using the useMemo Hook to memoized the value.
  const columns = React.useMemo(
    () => [
      {
        Header: "Processed Date",
        accessor: "processedDate",
        Filter: columnFilter,
      },
      {
        Header: "Claim ID",
        accessor: "claimId",
        Filter: columnFilter,
      },
      {
        Header: "Received Date",
        accessor: "receivedDate",
        Filter: columnFilter,
      },
      {
        Header: "State",
        accessor: "state",
        Filter: columnFilter,
      },
      {
        Header: "Assigned By",
        accessor: "assignedBy",
        Filter: columnFilter,
      },
      {
        Header: "Assigned Date",
        accessor: "assignedDate",
        Filter: columnFilter,
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: columnFilter,
      },
      {
        Header: "Assign To",
        accessor: "assignTo.name", // Assuming you want to display the name
        Filter: columnFilter,
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
      <div className='row table_top_area'>
        {/* Go To Input */}

        <div className='col-lg-6 col-md-12 col-sm-12 my-2 text-lg-start text-md-center text-sm-center text-end'>
          {/* Step 2: Attach event handler */}
          <SelectNames names={names} />
        </div>

        {/* Search Input */}
        <div className='col-lg-6 col-md-12 col-sm-12 my-2 text-lg-end text-md-center text-sm-center text-center'>
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
                      selectedRow =>
                        selectedRow.claimId === row.original.claimId
                    )}
                    onChange={() => {
                      if (
                        selectedRows.some(
                          selectedRow =>
                            selectedRow.claimId === row.original.claimId
                        )
                      ) {
                        setSelectedRows(
                          selectedRows.filter(
                            selectedRow =>
                              selectedRow.claimId !== row.original.claimId
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
        <div className='me-auto w-50'>
          <GoToInput
            type='number'
            title='Go to page:'
            gotoPage={gotoPage}
            defaultValue={pageIndex + 1}
          />
        </div>
        <div className='me-auto w-100'>
          <Pagination
            gotoPage={gotoPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            page={page}
            pageIndex={pageIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkingDataTable;
