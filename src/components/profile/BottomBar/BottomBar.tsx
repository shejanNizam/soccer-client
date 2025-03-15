import { FaBell, FaProjectDiagram, FaUser, FaWallet } from "react-icons/fa";
import { IoHome } from "react-icons/io5";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomBar() {
  //   const { user } = useSelector((state) => state.auth);
  const pathname = usePathname();
  const isActive = (href: string) => {
    // Match exact pathname or the root of the profile path
    if (pathname === href) {
      return true;
    }
    // For the Profile section and its subroutes, check the first part of the pathname
    if (href === "/profile" && pathname.startsWith("/profile")) {
      return true;
    }
    return false;
  };

  // Define bottom bar menu items for "provider" and default roles
  //   const bottomBarItemsProvider = [
  //     { name: "Home", icon: <IoHome size={24} />, path: "/" },
  //     {
  //       name: "Curr. Projects",
  //       icon: <FaProjectDiagram size={24} />,
  //       path: "/profile/current-projects",
  //     },
  //     {
  //       name: "My Bids",
  //       icon: <FaCheckCircle size={24} />,
  //       path: "/profile/my-bids",
  //     },
  //     { name: "Wallet", icon: <FaWallet size={24} />, path: "/profile/wallet" },
  //     {
  //       name: "My Review",
  //       icon: <FaStar size={24} />,
  //       path: "/profile/my-review",
  //     },
  //     { name: "Profile", icon: <FaUser size={24} />, path: "/profile/user" },
  //   ];

  const bottomBarItemsDefault = [
    { name: "Home", icon: <IoHome />, path: "/" },

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
    { name: "My Profile", icon: <FaUser />, path: "/profile/user" },
  ];

  return (
    <>
      {/* Bottom Bar for Mobile Devices */}
      <div
        className={`md:hidden fixed bottom-0 left-0 w-full bg-hash  flex justify-around items-center p-3 transition-all duration-200`}
      >
        {bottomBarItemsDefault.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            className={`flex flex-col items-center ${
              isActive(item.path) ? "text-primary" : "text-text-gray-800"
            }`}
          >
            {item.icon}
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
        {/* Conditionally Render Bottom Bar Items */}
        {/* {user?.role === "provider"
          ? bottomBarItemsProvider.map((item) => (
              <Link
                href={item.path}
                key={item.name}
                className={`flex flex-col items-center ${
                  isActive(item.path) ? "text-primary" : "text-text-gray-800"
                }`}
              >
                {item.icon}
                <span className="text-xs">{item.name}</span>
              </Link>
            ))
          : bottomBarItemsDefault.map((item) => (
              <Link
                href={item.path}
                key={item.name}
                className={`flex flex-col items-center ${
                  isActive(item.path) ? "text-primary" : "text-text-gray-800"
                }`}
              >
                {item.icon}
                <span className="text-xs">{item.name}</span>
              </Link>
            ))} */}
      </div>
    </>
  );
}
