import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { navItems } from "./nav-items";
import Layout from "./components/Layout";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                isLoggedIn ? <Layout /> : <Navigate to="/login" replace />
              }
            >
              {navItems.map(({ to, page }) => (
                <Route key={to} path={to} element={page} />
              ))}
              {navItems
                .filter((item) => item.subItems)
                .flatMap((item) =>
                  item.subItems.map((subItem) => (
                    <Route key={subItem.to} path={subItem.to} element={<div>{subItem.title} Content</div>} />
                  ))
                )}
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
