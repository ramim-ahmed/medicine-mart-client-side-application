import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import Spinner from "@/components/Spinner";
export default function AdminPrivateRoute({ children }) {
  const { authUser, loading } = useAuth();
  const [role, isLoading] = useRole();
  const location = useLocation();

  if (loading || isLoading) {
    return (
      <div className="flex justify-center min-h-screen items-center">
        <Spinner />
      </div>
    );
  }

  if (authUser && role === "ADMIN") {
    return children;
  }

  return <Navigate to="/" state={location.pathname} replace />;
}

AdminPrivateRoute.propTypes = {
  children: PropTypes.node,
};
