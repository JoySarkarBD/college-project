/* eslint-disable react/prop-types */

import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { FaBackward, FaForward } from "react-icons/fa";

import "./Pagination.css";

const Pagination = ({ gotoPage, pageSize, setPageSize, page, pageIndex }) => {
  return (
    <div>
      {/* Fast BackWard Button */}
      <button
        className='page_btn border-0 me-2'
        onClick={() => gotoPage(0)}
        disabled={pageIndex === 0}>
        <FaBackward className='fs-3' />
      </button>
      {/* BackWard Button */}
      <button
        className='page_btn border-0 me-2'
        onClick={() => gotoPage(pageIndex - 1)}
        disabled={pageIndex === 0}>
        <AiFillStepBackward className='fs-3' />
      </button>
      {/*  */}
      <span className='fs-5'>
        Page{" "}
        <strong>
          {pageIndex + 1} of {page.length}
        </strong>{" "}
      </span>
      {/* Pagination Select */}
      <select
        className='p-2'
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value));
        }}>
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
      {/* Forward Button  */}
      <button
        className='page_btn border-0 me-2'
        onClick={() => gotoPage(pageIndex + 1)}
        disabled={pageIndex >= page.length - 1}>
        <AiFillStepForward className='fs-3' />
      </button>
      {/* Fast Forward Button  */}
      <button
        className='page_btn border-0 me-2'
        onClick={() => gotoPage(page.length - 1)}
        disabled={pageIndex >= page.length - 1}>
        <FaForward className='fs-3' />
      </button>
    </div>
  );
};

export default Pagination;
