import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { navItems } from '../nav-items';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${isMenuOpen ? 'w-64' : 'w-16'} bg-gray-800 text-white transition-all duration-300`}>
        <Button
          onClick={toggleMenu}
          variant="ghost"
          size="icon"
          className="mt-4 ml-4 text-white hover:bg-gray-700"
        >
          {isMenuOpen ? <ChevronLeft /> : <ChevronRight />}
        </Button>
        <nav className="mt-5">
          <ul>
            {navItems.map((item) => (
              <li key={item.to} className="mb-2">
                <Link
                  to={item.to}
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {item.icon}
                  {isMenuOpen && <span className="ml-2">{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="absolute bottom-4 left-4 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isMenuOpen && "Logout"}
        </Button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
