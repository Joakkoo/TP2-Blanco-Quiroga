
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import EstadisticasPage from './pages/EstadisticasPage';
import HomePage from './pages/HomePage.js';
import ProtectedRoute from './components/ProtectedRoute.js'
import { UserProvider } from './context/user.js';


const AppRoutes = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />} >
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/estadisticas" element={<EstadisticasPage />} />
          </Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default AppRoutes;
