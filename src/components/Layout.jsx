import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { navItems } from '../nav-items';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5">
          <ul>
            {navItems.map((item) => (
              <li key={item.to} className="mb-2">
                <Link
                  to={item.to}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Link>
                {item.subItems && (
                  <ul className="ml-4 mt-2">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.to}>
                        <Link
                          to={subItem.to}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;