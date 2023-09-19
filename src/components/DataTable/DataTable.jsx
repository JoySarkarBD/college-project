/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
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
import AdminTableTopbar from "../TableTopbar/AdminTableTopbar";
import "./DataTable.css";

const DataTable = () => {
  // select row state
  const [selectedRows, setSelectedRows] = useState([]);

  // [name lists state in modal]
  const [names, setNames] = useState([]);

  // update multiple users
  const [selectedOption, setSelectedOption] = useState("");

  // selected value
  const handleSelect = (selectedValue) => {
    setSelectedOption(selectedValue); // Store the selected value in the parent component's state
  };

  /* update many at a time */
  const batchUpdate = () => {
    if (selectedRows.length > 0 && selectedOption) {
      const batchUpdateArr = [];
      dummyData.forEach((data) => {
        if (selectedRows.includes(data.id)) {
          const newObj = { ...data, assignTo: selectedOption };
          batchUpdateArr.push(newObj);
        }
      });

      if (batchUpdateArr.length > 0) {
        batchUpdateArr.forEach((row) => {
          fetch(`http://localhost:3000/assignTo/${row.id}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(row),
          })
            .then((response) => response.json())
            .then((data) => {
              setDummyData((prevData) => {
                // Find the index of the updated item in the data array
                const dataIndex = prevData.findIndex(
                  (prevItemData) => prevItemData.id === data?.id
                );

                if (dataIndex !== -1) {
                  // Create a new array with the updated data
                  const newData = [...prevData];
                  newData[dataIndex] = data; // Assuming the API response is the updated data
                  return newData;
                }
                return prevData;
              });
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      }

      // batch || bulk update

      // console.log(batchUpdate);
    }
  };

  // specific selected row
  const [singleRow, setSingleRow] = useState("");
  // data storing after fetching
  const [dummyData, setDummyData] = useState([]);

  // fetching all the assign work data
  useEffect(() => {
    (function () {
      fetch("http://localhost:3000/assignTo")
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
          setDummyData(data);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    })();

    (async function () {
      const res = await (
        await fetch(`http://localhost:3000/assignUserList`)
      ).json();
      setNames(res);
    })();
  }, []);

  // using the useMemo Hook to memoized the value.
  const data = React.useMemo(() => dummyData, [dummyData]);

  /* modal to assign single data start */
  const handelSingleItemUpdate = (item) => {
    const id = singleRow?.id;

    const updatedData = { ...singleRow, ...item };

    // Update user data on the server
    fetch(`http://localhost:3000/assignTo/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the UI with the new data
        setDummyData((prevData) => {
          // Find the index of the updated item in the data array
          const dataIndex = prevData.findIndex(
            (singleDummyData) => singleDummyData?.id === id
          );

          if (dataIndex !== -1) {
            // Create a new array with the updated data
            const newData = [...prevData];
            newData[dataIndex] = data; // Assuming the API response is the updated data
            return newData;
          }
          return prevData;
        });
      })
      .catch((err) => console.log(err));
  };

  /* modal to assign single data end */

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
          return (
            <div>
              {/* normal view by default of assignTo cell */}
              <div className='edit_assign_to'>
                <div className='fw-bolder assign_value_clr'>
                  {value.name}
                  <br />
                  {value.mail}
                </div>

                <button
                  onClick={() => setSingleRow(row?.original)}
                  className='edit-btn'
                  type='button'
                  data-bs-toggle='modal'
                  data-bs-target='#exampleModal3'>
                  <FiEdit2 />
                </button>
              </div>
            </div>
          );
        },
        Filter: columnFilter,
        // custom search filter for the assignTo (for name and mail)
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

  // Calculate the total number of pages based on data length and pageSize
  const totalPages = Math.ceil(data.length / pageSize);

  // Ensure that pageIndex is within bounds
  const normalizedPageIndex =
    pageIndex >= totalPages ? totalPages - 1 : pageIndex;

  return (
    <div className='px-5 my-5 table-responsive'>
      <div className='row'>
        {/* Go To Input */}
        <div className='col-lg-4 col-md-12 col-sm-12 my-2 text-lg-start text-md-center text-sm-center text-center'>
          <GoToInput
            gotoPage={gotoPage}
            pageIndex={normalizedPageIndex} // Pass the pageIndex to GoToInput
            totalPages={totalPages} // Pass the totalPages to GoToInput
          />
        </div>

        <div className='col-lg-4 col-md-12 col-sm-12 my-2 text-lg-center text-md-center text-sm-center text-center'>
          <SelectNames selectedName={{ names, handleSelect, batchUpdate }} />
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
      <AdminTableTopbar />
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
                      setSelectedRows(
                        page.map((row) => {
                          return row.original?.id;
                        })
                      );
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
                      (selectedRow) => selectedRow === row.original.id
                    )}
                    onChange={() => {
                      if (
                        selectedRows.some(
                          (selectedRow) => selectedRow === row.original.id
                        )
                      ) {
                        setSelectedRows(
                          selectedRows.filter(
                            (selectedRow) => selectedRow !== row.original.id
                          )
                        );
                      } else {
                        setSelectedRows([...selectedRows, row.original?.id]);
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
          totalPages={totalPages}
          currentPage={normalizedPageIndex}
          pageSize={pageSize}
          setPageSize={(newPageSize) => {
            setGlobalFilter(""); // Clear global filter when changing page size
            setPageSize(newPageSize);
          }}
          gotoPage={(newPageIndex) => {
            setGlobalFilter(""); // Clear global filter when changing pages
            pageIndex === newPageIndex || normalizedPageIndex === newPageIndex
              ? null
              : gotoPage(newPageIndex);
          }}
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
                {names.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className='listing_sty3 py-1'
                      data-bs-dismiss='modal'
                      aria-label='Close'>
                      <div
                        className='listing_sty2'
                        style={{ cursor: "pointer" }}
                        onClick={() => handelSingleItemUpdate(item)}>
                        <div>
                          <p className='item_name'>{item?.assignTo?.name}</p>
                          <p className='item_mail'>{item?.assignTo?.mail}</p>
                        </div>
                      </div>
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
