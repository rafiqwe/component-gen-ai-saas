import { useState } from "react";
import SideBar from "../../components/deshboard/SideBar";
import Header from "../../components/deshboard/Header";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200 transition-colors">
      {/* Sidebar */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Topbar */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Routed page content */}
        <main className="flex-1 p-4 relative mt-14 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-200 transition-colors">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
