import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context";
function RequireAuth({ isLoggedIn = false }) {
  const { currentUser } = useAuth();
  const location = useLocation();
  if (isLoggedIn) {
    return currentUser?.uid ? (
      <Navigate
        to={location?.state?.from?.pathname || "/"}
        state={{ from: location }}
        replace
      />
    ) : (
      <Outlet />
    );
  }
  return currentUser?.uid ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export { RequireAuth };
