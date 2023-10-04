import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Modal from "../../Utility/Modal";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (user === undefined) {
    return <Modal title="Please Wait" message="Fetching Data From Server." />;
  } else if (user) {
    return children;
  } else {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "You Have to Login To Read The Full News Details.",
      showConfirmButton: false,
      timer: 2500,
    });
    return <Navigate state={location.pathname} to="/login" />;
  }
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
