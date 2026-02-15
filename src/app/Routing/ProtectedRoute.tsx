import type { JSX } from "react";
import { Navigate, Outlet } from "react-router";
import { getAccessToken } from "../../shared/utils";

export const ProtectedRoute = (): JSX.Element => {
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace />
  }
  
  return <Outlet />;
}