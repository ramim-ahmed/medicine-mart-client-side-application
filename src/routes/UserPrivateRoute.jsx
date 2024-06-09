import Spinner from "@/components/Spinner";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
export default function UserPrivateRoute({ children }) {
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

  if (authUser && role === "USER") {
    return children;
  }

  return <Navigate to="/" state={location.pathname} replace />;
}

UserPrivateRoute.propTypes = {
  children: PropTypes.node,
};
