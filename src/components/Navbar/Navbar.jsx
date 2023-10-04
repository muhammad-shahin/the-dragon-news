import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const handleLogOut = () => {
    logoutUser();
  };
  return (
    <nav className="text-center mt-8 mb-10 flex justify-center items-center flex-col gap-4 lg:gap-0 lg:flex-row">
      <ul className="flex justify-center items-center gap-4 lg:flex-1">
        <li className="text-secondary font-medium text-18 leading-8">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="text-secondary font-medium text-18 leading-8">
          <NavLink to="/about">About</NavLink>
        </li>
        <li className="text-secondary font-medium text-18 leading-8">
          <NavLink to="/categories">Categories</NavLink>
        </li>
      </ul>
      <div className="flex gap-3 justify-center items-center">
        <BsPersonCircle className="text-[32px] text-primary" />
        {user ? (
          <button
            className="py-1 px-5 bg-primary text-white"
            onClick={handleLogOut}
          >
            Logout
          </button>
        ) : (
          <button className="py-1 px-5 bg-primary text-white">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
