import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "@/lib/adminAuth";

type ProtectedAdminRouteProps = {
  children: JSX.Element;
};

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
