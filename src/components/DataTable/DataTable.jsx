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
import GoToInput from "../Form/GoToInput";
import SearchInput from "../Form/SearchInput";
import Pagination from "../Pagination/Pagination";
import TableTopbar from "../TableTopbar/TableTopbar";
import dummyData from "./../../../data.json"; // Update the path to your data.json
import "./DataTable.css";

const DataTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);

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
        Filter: columnFilter,
        Cell: ({ value }) => {
          return (
            <div>
              {value.name} <br /> {value.mail}
            </div>
          );
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
    []
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
    <div className="px-5 my-5">
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
