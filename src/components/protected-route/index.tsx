import React, { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../providers/auth';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({
  children,
}: ProtectedRouteProps): JSX.Element => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return <>{children}</>;
};
