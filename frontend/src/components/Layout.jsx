import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Full-width header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar below header */}
        <Sidebar />
        <main className="flex-1 overflow-auto p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
