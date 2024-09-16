import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
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
  </React.StrictMode>
);

export default App;
