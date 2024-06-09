import useAuth from "@/hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
export default function PrivateRoute({ children }) {
  const { authUser } = useAuth();

  const location = useLocation();

  if (authUser) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname} replace />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
