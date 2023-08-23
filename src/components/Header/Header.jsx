import { BsQuestionCircleFill } from "react-icons/bs";
import "./Header.css";

const Header = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary my-2'>
      <div className='container-fluid'>
        <div className='navbar-brand logo_img fs-4 py-3 px-5' href='#'>
          <span> [ LOGO IMAGE ]</span>
        </div>
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
        <div className='collapse navbar-collapse' id='navbarText'>
          <div className='navbar-nav text-center mx-auto mb-2 mb-lg-0'>
            <h1 className='header_title fw-semibold fs-1'>TOOL HEADER</h1>
          </div>
          <div className='d-flex '>
            <ul className='navbar-nav'>
              <li className='nav-item d-flex align-items-center fs-5 me-3 '>
                <BsQuestionCircleFill className='me-1 icons_style' />{" "}
                <span className='fw-semibold item_color'>Help</span>
              </li>
              <li className='nav-item d-flex align-items-center fs-5 me-3'>
                <div className='dropdown'>
                  <button
                    className='border-0 dropdown-toggle bg-transparent fw-semibold item_color'
                    type='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'>
                    English
                  </button>
                  <ul className='dropdown-menu'>
                    <li>
                      <a className='dropdown-item fw-bold item_color' href='#'>
                        বাংলা
                      </a>
                    </li>
                    <li>
                      <a className='dropdown-item fw-bold item_color' href='#'>
                        हिंदी
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className='nav-item d-flex align-items-center fs-5 me-3'>
                <span className='fw-semibold item_color'>
                  {" "}
                  Account / Profile{" "}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
