import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UseUser from '../hook/useUser';

const ProtectedRoute = () => {
    const { logged } = UseUser();
    console.log("Estalogueado=",logged)
    return(
        logged !== false ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default ProtectedRoute;
