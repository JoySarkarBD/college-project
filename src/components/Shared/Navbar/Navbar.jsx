import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      
      <nav className='navbar navbar-expand-lg nav_section p-0'>
        <div className='container-fluid '>
          {/* navigation toggle button */}
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon text-primary'></span>
          </button>
          {/* Navigation section */}
          <div className='collapse navbar-collapse' id='navbarNav'>
            {/* Left side navigation */}
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                {/* Home Nav */}
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "active_link nav-link fw-bold fs-lg-3 fs-md-4 fs-sm-5 py-3 px-3"
                      : "nav-link fw-bold fs-lg-3 fs-md-4 fs-sm-5 py-3 px-3"
                  }
                  aria-current='page'
                  to='/'>
                  Home
                </NavLink>
              </li>

              {/* Admin Nav  dropdown */}
              <li className='nav-item dropdown'>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "active_link nav-link fw-bold fs-lg-3 fs-md-4 fs-sm-5 py-3 px-3 nav-link dropdown-toggle"
                      : " nav-link fw-bold fs-lg-3 fs-md-4 fs-sm-5 py-3 px-3 nav-link dropdown-toggle"
                  }
                  to='admin'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  Admin
                </NavLink>

                <ul className='dropdown-menu'>
                  <li>
                    <NavLink className='dropdown-item' to='assign-work'>
                      ASSIGN WORK
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className='dropdown-item' to='manage-user'>
                      MANAGE USER
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className='dropdown-item' to='manage-upload-data'>
                      MANAGE UPLOAD DATA
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className='dropdown-item' to='delegate-access'>
                      DELEGATE ACCESS
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Work Queue Nav */}
              <li className='nav-item'>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "active_link nav-link fw-bold fs-lg-3 fs-md-4 fs-sm-5 text-lg text-md  py-3 px-3"
                      : "nav-link fw-bold fs-lg-3 fs-md-4 fs-sm-5 py-3 px-3"
                  }
                  to='work-queue'>
                  Work Queue
                </NavLink>
              </li>
              {/*   Upload Data Nav */}
              <li className='nav-item'>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "active_link nav-link fw-bold fs-lg-3 fs-md-4 fs-sm-5 py-3 px-3"
                      : "nav-link fw-bold fs-lg-3 fs-md-4 fs-sm-5 py-3 px-3"
                  }
                  to='upload-data'>
                  Upload Data
                </NavLink>
              </li>

              {/*   Reports Nav dropdown */}
              <li className='nav-item dropdown'>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "active_link nav-link fw-bold fs-lg-3 fs-md-4 fs-sm-5 py-3 px-3 nav-link dropdown-toggle"
                      : "nav-link fw-bold fs-lg-3 fs-md-4 fs-sm-5 py-3 px-3 nav-link dropdown-toggle"
                  }
                  to='reports'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  REPORT
                </NavLink>

                <ul className='dropdown-menu'>
                  <li>
                    <NavLink className='dropdown-item' to='data-export'>
                      DATA EXPORT
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className='dropdown-item' to='audit-report'>
                      AUDIT REPORT
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>

            {/* right side  */}
            <div className='d-flex'>
              <button className='btn supervisor_btn bg-transparent fw-normal fs-lg-3 fs-md-4 fs-sm-5 '>
                User Like Supervisor
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
