import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSession } from '../../context/SessionProvider';

export function RoleRoute({ allow = [], redirectTo, children }) {
  const location = useLocation();
  const { accessRole, isAdmin } = useSession();
  const resolvedRedirect = redirectTo
    || (accessRole === 'STUDENT'
      ? '/student-portal'
      : accessRole === 'FACULTY'
        ? '/users'
        : '/dashboard');

  const hasAccess = allow === 'admin'
    ? isAdmin
    : Array.isArray(allow) && allow.length > 0
      ? allow.includes(accessRole)
      : true;

  if (hasAccess) {
    return children;
  }

  return <Navigate to={resolvedRedirect} replace state={{ deniedFrom: location.pathname }} />;
}
