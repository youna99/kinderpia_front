import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { getJwtFromCookies } from '../../utils/extractUserIdFromCookie';

const PrivateRoute = ({ element }: { element: ReactElement }) => {
  const jwt = getJwtFromCookies();
  return jwt ? element : <Navigate to="/login/required" />;
};

export default PrivateRoute;
