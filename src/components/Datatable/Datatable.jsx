import React, { useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import data from "../../../data.json"; // Import your data JSON

const DataTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  console.log(selectedRows);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Assign To",
        accessor: "assignTo",
      },
      {
        Header: "Assign Date",
        accessor: "assignDate",
      },
      {
        Header: "Due Date",
        accessor: "dueDate",
      },
      {
        Header: "Status",
        accessor: "status",
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
    useSortBy,
    usePagination
  );

  return (
    <>
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
          <input
            type='text'
            placeholder='Search...'
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <table className='table' {...getTableProps()}>
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
                  </th>
                ))}
              </tr>
            ))}
          </thead>
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
                  {row.cells.map((cell, index) => {
                    return (
                      <td key={index} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
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
    </>
  );
};

export default DataTable;
