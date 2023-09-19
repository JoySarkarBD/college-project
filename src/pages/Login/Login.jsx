import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const userPass = `12345`;
  const [password, setPassWord] = useState("");
  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    if (password !== userPass) {
      return alert("Password does not match");
    } else {
      navigate("/");
    }
  };

  return (
    <div className='login-page my-5'>
      <div>
        <h3 className='title mb-5'>
          <span className='fw-semibold'>welcome to</span>
          <span className='fw-bolder'>tool name tool name</span>
        </h3>
        <form className='login_form' onSubmit={handleForm}>
          <h3>Login Credential</h3>
          <div className='mt-4'>
            {/* Login Type */}
            <div className='d-flex align-items-center mb-4'>
              <h5 className='form_label'>
                Login Type <span className='ms-5'>:</span>
              </h5>
              <div className='d-flex align-items-center mx-4'>
                <div className='form-check ml-3'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='flexRadioDefault'
                    id='id1'
                  />
                  <label className='form-check-label' htmlFor='id1'>
                    ID1
                  </label>
                </div>
                <div className='form-check form-check_id2'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='flexRadioDefault'
                    id='id2'
                  />
                  <label className='form-check-label' htmlFor='id2'>
                    ID2
                  </label>
                </div>
              </div>
            </div>

            {/* Domain Id */}
            <div className='d-flex align-items-center mb-4'>
              <h5 className='form_label'>
                Domain Id <span className='ms-5'>:</span>
              </h5>
              <div className='mx-4'>
                <span className='form_label_text'>MS</span>
              </div>
            </div>

            {/* Windows Id */}
            <div className='d-flex align-items-center mb-4'>
              <h5 className='form_label'>
                Windows Id <span className='ms-5'>:</span>
              </h5>
              <div className='mx-4'>
                <input
                  type='text'
                  className='form-control windows_id_input'
                  placeholder='LGARISSON'
                />
              </div>
            </div>

            {/* Team*/}
            <div className='d-flex align-items-center mb-4'>
              <h5 className='form_label'>
                Team <span className='ms-5'>:</span>
              </h5>
              <div className='mx-4'>
                <button
                  className='btn btn-outline-secondary dropdown-toggle'
                  type='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  Scrubber/Auditor
                </button>
                <ul className='dropdown-menu'>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Scrubber/Auditor1
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Scrubber/Auditor
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Password*/}
            <div className='d-flex align-items-center '>
              <h5 className='form_label'>
                Password <span className='ms-5'>:</span>
              </h5>
              <div className='mx-4'>
                <input
                  type='password'
                  className='form-control windows_id_input'
                  placeholder='Enter Your Password'
                  value={password}
                  onChange={(e) => setPassWord(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button type='submit' className='btn-login'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
