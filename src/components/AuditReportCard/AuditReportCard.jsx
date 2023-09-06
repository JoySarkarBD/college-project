import "./AuditReportCard.css";

const AuditReportCard = () => {
  const handleForm = () => {
    event.preventDefault();
  };

  return (
    <div className='container mt-5 '>
      <div className='card w-75 mx-auto '>
        <div className='card-body '>
          <form action='#' onSubmit={handleForm}>
            {/* Report type Select */}
            <div className='w-50 mx-auto my-5'>
              <label className='form-label fw-bold'>REPORT TYPE</label>
              <select
                className='form-select'
                aria-label='Default select example'>
                <option>Select Report Type</option>
                <option value='efficiency report'>EFFICIENCY REPORT</option>
                <option value='accuracy report'>ACCURACY REPORT</option>
              </select>
            </div>
            {/* User Type Select */}
            <div className='w-50 mx-auto my-5'>
              <label className='form-label fw-bold'>
                SELECT USER<sup className='text-danger'>*</sup>{" "}
              </label>
              <select
                className='form-select'
                aria-label='Default select example'>
                <option>Select User</option>
                <option value='raju kishore dholakia'>
                  RAJU KISHORE DHOLAKIA
                </option>
              </select>
            </div>

            {/* Date Range */}
            <div className='w-50 mx-auto my-5'>
              <h5>Date Range</h5>
              <p className='text-secondary'>
                (Leave Blank to select last 1 Year data)
              </p>

              <div className='row g-3 align-items-center mb-5'>
                <div className='col-auto'>
                  <label htmlFor='date1' className='col-form-label fw-bold'>
                    From
                  </label>
                </div>
                <div className='col-auto'>
                  <input
                    type='date'
                    id='date1'
                    className='form-control'
                    aria-describedby='passwordHelpInline'
                  />
                </div>
                <div className='col-auto'>
                  <label htmlFor='date2' className='col-form-label fw-bold'>
                    To
                  </label>
                </div>
                <div className='col-auto'>
                  <input
                    type='date'
                    id='date2'
                    className='form-control'
                    aria-describedby='passwordHelpInline'
                  />
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <div className='text-center mt-3 mb-5'>
              <input
                type='submit'
                value='GET REPORT'
                className='get_report_btn'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuditReportCard;
