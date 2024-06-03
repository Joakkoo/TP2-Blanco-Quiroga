import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UseUser from '../hook/useUser';

const ProtectedRoute = () => {
    const { token } = UseUser();
    return(
        token ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default ProtectedRoute;
