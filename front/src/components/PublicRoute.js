import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UseUser from '../hook/useUser';

const PublicRoute = () => {
    const { logged } = UseUser();
    return(
        logged !== true ? <Outlet /> : <Navigate to="/Estadisticas" replace />
    )
}

export default PublicRoute;
