import { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiSolidError } from "react-icons/bi";
import PageTitle from "../../components/Shared/PageTitle/PageTitle";
import "./UploadData.css";

const UploadData = () => {
  const [selectedFileName, setSelectedFileName] = useState("");
  // error modal & success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFileName(file.name);
  };

  // validate and upload file validation
  const handleValidateAndUpload = () => {
    // Assuming valid file types are Excel files
    const validFileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    const file = document.getElementById("actual-btn").files[0];

    if (file && validFileTypes.includes(file.type)) {
      setShowSuccessModal(true);
      setShowErrorModal(false);
    } else {
      setShowSuccessModal(false);
      setShowErrorModal(true);
    }
  };

  //
  let dataBsTarget = showErrorModal ? "#errorModal" : "#successModal";

  return (
    <>
      <PageTitle title='Upload Data' />
      <div className='container'>
        <h1 className='text-center mt-4 mb-2  upload_data_title  '>
          UPLOAD DATA
        </h1>
        <hr className='upload_divider' />

        <div className='mt-5 pt-3'>
          <div className='mx-auto w-75'>
            <h3>
              Please click for the
              <span>
                {" "}
                <a href='#'>Sample File format</a>
              </span>
            </h3>
          </div>

          <div className='mx-auto w-75 mt-5'>
            <input
              type='file'
              id='actual-btn'
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            />
            {/*  Choose File Button */}
            <button
              className='upload_btn'
              onClick={() => document.getElementById("actual-btn").click()}>
              Choose File
            </button>
            {/* Upload file Text Content */}
            <span id='file-chosen' className='fw-bolder ps-2 fs-5'>
              {selectedFileName || "No file choosen"}
            </span>
            {/* Validate and Upload */}
            <button
              className='validation_btn'
              onClick={handleValidateAndUpload}
              data-bs-toggle='modal'
              data-bs-target={dataBsTarget}>
              Validate and Upload
            </button>
            {/* Export Erroneous Data Button */}
            <div className='mt-5 mx-auto'>
              <button className='export_btn'>Export Erroneous Data</button>
            </div>
          </div>

          {/*Error Modal */}
          <div
            // className='modal fade'
            className={`modal fade ${showErrorModal ? "show" : ""}`}
            id='errorModal'
            tabIndex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden={!showErrorModal}>
            <div className='modal-dialog modal-dialog-centered'>
              <div className='modal-content'>
                <div className='modal-header border-0'>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'></button>
                </div>

                <div className='modal-body'>
                  <div className='text-center'>
                    <BiSolidError className='fs-1 err_mod_icon' />
                  </div>
                  <h3 className='warn_heading fw-bolder'>Warning</h3>
                  <p>File contains error. Export erroneous data to validate.</p>
                </div>

                <div className='modal-footer border-0 justify-content-start mb-5'>
                  <button type='button' className='ok_btn w-25 py-2'>
                    Ok
                  </button>
                  <button
                    type='button'
                    className='cancel_btn w-25 py-2'
                    data-bs-dismiss='modal'>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/*Success Modal */}
          <div
            // className='modal fade'
            className={`modal fade ${showSuccessModal ? "show" : ""}`}
            id='successModal'
            tabIndex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden={!showSuccessModal}>
            <div className='modal-dialog modal-dialog-centered'>
              <div className='modal-content'>
                <div className='modal-header border-0'>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'></button>
                </div>

                <div className='modal-body'>
                  <div className='text-center'>
                    <AiFillCheckCircle className='fs-1 succ_icon' />
                  </div>
                  <h3 className='warn_heading fw-bolder'>Success</h3>
                  <p>File(s) successfully uploaded!</p>
                </div>

                <div className='modal-footer border-0 justify-content-start mb-5'>
                  <button type='button' className='ok_btn w-25 py-2'>
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadData;
