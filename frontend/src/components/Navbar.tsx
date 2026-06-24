import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, User as UserIcon, LogOut, LayoutDashboard, Ticket } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="brand">
          <Film size={28} />
          Cine<span>Reservas</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Cartelera
          </Link>
          
          {user && user.role === 'CLIENT' && (
            <Link to="/my-reservations" className={`nav-link ${isActive('/my-reservations') ? 'active' : ''}`}>
              <Ticket size={18} />
              Mis Reservas
            </Link>
          )}

          {user && user.role === 'ADMIN' && (
            <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
              <LayoutDashboard size={18} />
              Administración
            </Link>
          )}

          {user ? (
            <div className="flex-gap-sm">
              <div className="user-badge">
                <UserIcon size={14} />
                <span>{user.name}</span>
                <span className="user-role">{user.role}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm" style={{ width: 'auto' }}>
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex-gap-sm">
              <Link to="/login" className="btn btn-secondary btn-sm">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
