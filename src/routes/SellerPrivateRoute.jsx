import Spinner from "@/components/Spinner";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
export default function SellerPrivateRoute({ children }) {
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

  if (authUser && role === "SELLER") {
    return children;
  }

  return <Navigate to="/" state={location.pathname} replace />;
}

SellerPrivateRoute.propTypes = {
  children: PropTypes.node,
};
