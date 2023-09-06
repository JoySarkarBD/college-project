/* eslint-disable react/prop-types */
import React from "react";

const Pagination = ({
  totalPages,
  currentPage,
  pageSize,
  setPageSize,
  gotoPage,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className='d-flex justify-content-center gap-2 mt-3'>
      <div>
        <span>Show per page:</span>

        <select
          className='ms-2 p-2'
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            gotoPage(0); // Go to the first page when changing the page size
          }}>
          {[10, 20, 30, 40, 50].map((pageSizeOption) => (
            <option key={pageSizeOption} value={pageSizeOption}>
              {pageSizeOption}
            </option>
          ))}
        </select>
      </div>
      <nav aria-label='Page navigation example'>
        <ul className='pagination justify-content-center'>
          <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
            <button
              className='page-link'
              onClick={() => gotoPage(0)}
              disabled={currentPage === 0}>
              Previous
            </button>
          </li>
          {pageNumbers.map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}>
              <button className='page-link' onClick={() => gotoPage(page)}>
                {page + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages - 1 ? "disabled" : ""
            }`}>
            <button
              className='page-link'
              onClick={() => gotoPage(totalPages - 1)}
              disabled={currentPage === totalPages - 1}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
