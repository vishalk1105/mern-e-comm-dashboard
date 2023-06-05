import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      {auth ? (
        <ul className="nav_ul nav_left">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add-product">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              LogOut ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav_ul nav_right">
          <li>
            <Link to="/signup">SignUp</Link>
          </li>

          <li>
            <Link to="/login">Log In</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
