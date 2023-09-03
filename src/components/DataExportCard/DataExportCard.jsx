import { useState } from "react";
import "./DataExportCard.css";

const DataExportCard = () => {
  const [processDate, setrocessDate] = useState(false);
  const [status, setStatus] = useState(false);

  const handleForm = () => {
    event.preventDefault();
  };

  return (
    <div className='container mt-5 '>
      <div className='card w-75 mx-auto '>
        <div className='card-body '>
          <h3 className='text-center select_filter_title'>SELECT FILTERS</h3>
          <form action='#' className='my-5' onSubmit={handleForm}>
            <div className='d-flex justify-content-between align-items-center px-5 '>
              {/* PROCESSED DATE Check */}

              <div className='form-check check_form d-flex align-items-center'>
                <input
                  className='form-check-input data_export_check_input'
                  type='checkbox'
                  value={processDate}
                  id='flexCheckChecked'
                  onChange={(e) => setrocessDate(e.target.checked)}
                />
                <label
                  className='form-check-label ms-2 fw-bold fs-5'
                  htmlFor='flexCheckChecked'>
                  PROCESSED DATE
                </label>
              </div>

              {/* Date Select  */}

              <div className='d-flex justify-content-center align-items-center gap-2'>
                {/* From Select */}
                <div className=''>
                  <label className='form-label fw-bold'>FROM</label>
                  <br />
                  <input
                    type='date'
                    name='date1'
                    id='date1'
                    className='date_input'
                    disabled={!processDate}
                  />
                </div>
                {/* To Select */}
                <div className=''>
                  <label className='form-label fw-bold'>TO</label>
                  <br />
                  <input
                    type='date'
                    name='date2'
                    id='date2'
                    className='date_input'
                    disabled={!processDate}
                  />
                </div>
              </div>
            </div>

            <div className='d-flex justify-content-between align-items-center mt-3 mb-5 px-5'>
              {/* Status Check */}
              <div className='form-check d-flex align-items-center'>
                <input
                  className='form-check-input data_export_check_input'
                  type='checkbox'
                  value={status}
                  id='flexCheckChecked'
                  onChange={(e) => setStatus(e.target.checked)}
                />
                <label
                  className='form-check-label ms-2 fw-bold fs-5'
                  htmlFor='flexCheckChecked'>
                  STATUS
                </label>
              </div>

              {/* Select  */}

              <div className=''>
                <select
                  className='form-select err_select'
                  aria-label='Default select example'
                  disabled={!status}>
                  <option selected disabled>
                    Select
                  </option>
                  <option value='error'>ERROR</option>
                  <option value='no error'>NO ERROR</option>
                </select>
              </div>
            </div>

            <div className='d-flex justify-content-center align-items-center gap-3 py-5'>
              <button className='reset_filter_btn'>Reset Filters</button>
              <button className='data_export_btn'>EXPORT</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataExportCard;
