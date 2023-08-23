import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg nav_section'>
      <div className='container-fluid '>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          {/* Left side navigation */}
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active_link nav-link" : "nav-link"
                }
                aria-current='page'
                to='/'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active_link nav-link" : "nav-link"
                }
                to='admin'>
                Admin
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active_link nav-link" : "nav-link"
                }
                to='work-queue'>
                Work Queue
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active_link nav-link" : "nav-link"
                }
                to='upload-data'>
                Upload Data
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active_link nav-link" : "nav-link"
                }
                to='reports'>
                Reports
              </NavLink>
            </li>
          </ul>

          {/* right side  */}
          <div className='d-flex'>
            <button className='btn supervisor_btn '>
              User Like Supervisor
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
