"use client";

import BottomBar from "@/components/profile/BottomBar/BottomBar";
import Sidebar from "@/components/profile/Sidebar/Sidebar";
// import BottomBar from "@/components/BottomBar/BottomBar";
// import Sidebar from "@/components/userDashboard/Sidebar";
import { useState } from "react";

import { ReactNode } from "react";

interface ProfileLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebarCollapsed = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="relative flex flex-col md:flex-row bg-secondary">
      {/* Mobile Sidebar Toggle Button */}
      {/* <button
        onClick={toggleMobileSidebar}
        className="md:hidden absolute top-4 right-4 z-40 bg-primary text-white p-1 rounded-sm shadow-sm"
      >
        <FaBars size={16} />
      </button> */}

      {/* Sidebar for Desktop */}
      <div className="hidden md:block fixed top-20 left-0 z-20">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebarCollapsed={toggleSidebarCollapsed}
          onLinkClick={() => {}}
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 text-white transition-transform duration-300 md:hidden
          ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar
          isCollapsed={false}
          toggleSidebarCollapsed={toggleSidebarCollapsed}
          onLinkClick={closeMobileSidebar}
        />
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 bg-secondary transition-all duration-200 
          ${isSidebarCollapsed ? "md:ml-16" : "md:ml-64"}`}
      >
        <main className="mt-4 py-20 mb-20">{children}</main>
      </div>
      <BottomBar />
    </div>
  );
}
