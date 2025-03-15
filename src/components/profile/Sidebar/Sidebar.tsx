"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBell,
  FaProjectDiagram,
  FaUser,
  FaWallet,
} from "react-icons/fa";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebarCollapsed: () => void;
  onLinkClick: () => void;
}

export default function Sidebar({
  isCollapsed,
  toggleSidebarCollapsed,
  onLinkClick,
}: SidebarProps) {
  //   const { user } = useSelector((state) => state.auth);
  const pathname = usePathname();
  const firstLinkRef = useRef(null);

  const menuItems = [
    { name: "My Profile", icon: <FaUser />, path: "/profile/user" },
    {
      name: "Booked List",
      icon: <FaProjectDiagram />,
      path: "/profile/booked-list",
    },
    { name: "Wallet", icon: <FaWallet />, path: "/profile/wallet" },
    {
      name: `Notifications`,
      icon: <FaBell />,
      path: "/profile/notifications",
    },
    {
      name: `Re-schedule`,
      icon: <FaBell />,
      path: "/profile/re-schedule",
    },
  ];

  //   const menuItemsCont = [
  //     { name: "My Profile", icon: <FaUser />, path: "/profile/user" },
  //     {
  //       name: "Current Projects",
  //       icon: <FaProjectDiagram />,
  //       path: "/profile/current-projects",
  //     },
  //     { name: "Pending Bids", icon: <FaCheckCircle />, path: "/profile/my-bids" },
  //     { name: "Wallet", icon: <FaWallet />, path: "/profile/wallet" },
  //     {
  //       name: `Notifications`,
  //       icon: <FaStar />,
  //       path: "/profile/notifications",
  //     },
  //     { name: "My Review", icon: <FaBell />, path: "/profile/my-review" },
  //   ];

  return (
    <div
      className={`min-h-screen transition-all duration-200 ease-in-out bg-hash text-primary ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <div></div>
          <button
            onClick={toggleSidebarCollapsed}
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className="focus:outline-none"
          >
            {isCollapsed ? (
              <FaArrowRight size={20} />
            ) : (
              <FaArrowLeft size={20} />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-10 flex-1">
          <>
            {menuItems.map((item, index) => (
              <Link
                href={item.path}
                key={item.name}
                ref={index === 0 ? firstLinkRef : null}
                onClick={onLinkClick}
                className={`flex items-center px-4 py-3 mt-2 ${
                  pathname === item.path
                    ? "bg-primary text-secondary font-semibold border-l-8 border-button"
                    : "hover:bg-primary hover:text-secondary transition-colors duration-200"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && <span className="mx-3">{item.name}</span>}
              </Link>
            ))}
          </>
          {/* {user?.role === "provider" ? (
            <>
              {menuItemsCont.map((item, index) => (
                <Link
                  href={item.path}
                  key={item.name}
                  ref={index === 0 ? firstLinkRef : null}
                  onClick={onLinkClick}
                  className={`flex items-center px-4 py-3 mt-2 ${
                    pathname === item.path
                      ? "bg-gray-700 text-primary font-semibold border-l-4 border-primary"
                      : "hover:bg-gray-700 transition-colors duration-200"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {!isCollapsed && <span className="mx-3">{item.name}</span>}
                </Link>
              ))}
            </>
          ) : (
            <>
              {menuItems.map((item, index) => (
                <Link
                  href={item.path}
                  key={item.name}
                  ref={index === 0 ? firstLinkRef : null}
                  onClick={onLinkClick}
                  className={`flex items-center px-4 py-3 mt-2 ${
                    pathname === item.path
                      ? "bg-gray-700 text-primary font-semibold border-l-4 border-primary"
                      : "hover:bg-gray-700 transition-colors duration-200"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {!isCollapsed && <span className="mx-3">{item.name}</span>}
                </Link>
              ))}
            </>
          )} */}
        </nav>
      </div>
    </div>
  );
}
