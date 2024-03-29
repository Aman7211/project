import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Navbar() {
  const navigate = useNavigate();

  // Get the jwt token from localStorage
  const authToken = localStorage.getItem('authToken');

  // decode the token
  const decode = authToken ? jwtDecode(authToken) : null;

  const handleLogout = () => {
    // remove the jwt token from localStorage
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-bold px-3" to="/">Assignment</Link>
        <button className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5 pt-4 " aria-current="page" to="/">Home</Link>
            </li>
          </ul>
          {decode && (
                <h3 className="text-white mx-5 my-3 bg-danger px-3 py-3 ">{`Hello, Welcome ${decode.user.name}`}</h3>
            )}
          {!authToken ? (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
            </div>
          ) : (
            <div>
              <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
