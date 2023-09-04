import { BsQuestionCircleFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo1 from "../../assets/logo1.jpg";
import kungKhan from "./../../assets/king-khan.jpg";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("login");
  };

  const location = useLocation();
  const noAcc = location.pathname.includes("/login");

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary my-2'>
      <div className='container-fluid'>
        {/* Logo Image */}
        <Link to='/'>
          <div className='navbar-brand   py-3 px-lg-5 px-md-3 px-sm-1' href='#'>
            <img src={logo1} alt='' className='img-fluid logo_img' />
          </div>
        </Link>

        {/* Navigation toggle button */}
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarText'
          aria-controls='navbarText'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        {/* Navigation section */}
        <div className='collapse navbar-collapse' id='navbarText'>
          {/* Header title */}
          <div className='navbar-nav text-center mx-auto mb-2 mb-lg-0'>
            <h1 className='header_title fw-semibold fs-lg-1 fs-md-2 fs-sm-3'>
              TOOL HEADER
            </h1>
          </div>
          {/* header right part */}
          <div className='d-flex '>
            <ul className='navbar-nav'>
              {/* Help */}
              <li className='nav-item d-flex align-items-center  me-3 '>
                <BsQuestionCircleFill className='me-1 icons_style' />{" "}
                <span className='fw-semibold item_color fs-lg-4 fs-md-5 fs-sm-6'>
                  Help
                </span>
              </li>
              {/* Language dropdown part */}
              <li className='nav-item d-flex align-items-center  me-3'>
                <div className='dropdown'>
                  <button
                    className='border-0 dropdown-toggle bg-transparent fw-semibold item_color fs-lg-4 fs-md-5 fs-sm-6'
                    type='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'>
                    English
                  </button>
                  <ul className='dropdown-menu'>
                    <li className='fs-lg-4 fs-md-5 fs-sm-6'>
                      <a className='dropdown-item fw-bold item_color ' href='#'>
                        বাংলা
                      </a>
                    </li>
                    <li className='fs-lg-4 fs-md-5 fs-sm-6'>
                      <a className='dropdown-item fw-bold item_color ' href='#'>
                        हिंदी
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              {/* account / profile part */}
              {!noAcc && (
                <li className='nav-item d-flex align-items-center  me-3'>
                  <div className='dropdown'>
                    <button
                      className='border-0 dropdown-toggle bg-transparent fw-semibold item_color fs-lg-4 fs-md-5 fs-sm-6'
                      type='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'>
                      Accounts/Profile
                    </button>
                    <ul
                      className='dropdown-menu py-2'
                      style={{ left: "-152px" }}>
                      <li className='fs-lg-4 fs-md-5 fs-sm-6'>
                        <span className='text-center d-block fs-5 fw-bold'>
                          Welcome PETER
                        </span>
                        <div className='profile p-4'>
                          <img src={kungKhan} alt='kungKhan' />
                          <div className='d-flex flex-column'>
                            <span>PETER PHILIPPE</span>
                            <span>peter.philippe@gmail.com</span>
                          </div>
                        </div>
                        <div
                          className='text-end mx-4'
                          onClick={() => handleLogout()}>
                          <button className='logout-btn'>Log out</button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
