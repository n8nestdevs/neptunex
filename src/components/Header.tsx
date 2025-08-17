// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { IconUser } from './Icons';
import { useAuth } from '../context/AuthContext';
import LogoNeptunex from './LogoNeptunex';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-[1000] bg-navy-900/80 backdrop-blur border-b border-navy-800">
      <div className="flex items-center justify-between h-14 px-3">
        {/* Logo + Brand */}
        <Link
          to={isAuthenticated ? '/tracking' : '/login'}
          className="flex items-center text-slate-100"
          aria-label="Go to NEPTUNex"
        >
          <LogoNeptunex className="w-7 h-7 text-teal-400 mr-2" />
          <span className="font-semibold tracking-wide">NEPTUNex</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3 pr-3">
          {isAuthenticated && user ? (
            <>
              {user.role === 'SuperAdmin' && (
                <Link to="/superadmin" className="text-sm text-teal-400 hover:text-teal-300">
                  SuperAdmin
                </Link>
              )}

              <div className="hidden md:flex items-center text-slate-300 text-sm">
                <IconUser className="w-4 h-4 mr-1" />
                <span className="mr-2">{user.name}</span>
                <span className="px-2 py-0.5 rounded bg-navy-800 border border-navy-700">
                  {user.role}
                </span>
              </div>

              <button
                onClick={logout}
                className="text-sm bg-navy-800 hover:bg-navy-700 border border-navy-700 text-slate-200 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-sm text-teal-400 hover:text-teal-300">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;