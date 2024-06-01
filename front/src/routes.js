
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import EstadisticasPage from './pages/EstadisticasPage';
import HomePage from './pages/HomePage.js';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/estadisticas" element={<EstadisticasPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
