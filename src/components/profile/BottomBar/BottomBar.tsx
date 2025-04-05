import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaProjectDiagram, FaUser, FaWallet } from "react-icons/fa";
import { IoHome } from "react-icons/io5";

export default function BottomBar() {
  //   const { user } = useSelector((state) => state.auth);
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (pathname === href) {
      return true;
    }

    if (href === "/profile" && pathname.startsWith("/profile")) {
      return true;
    }
    return false;
  };

  const bottomBarItemsDefault = [
    { name: "Home", icon: <IoHome />, path: "/" },
    {
      name: "Booked List",
      icon: <FaProjectDiagram />,
      path: "/profile/booked-list",
    },
    { name: "Wallet", icon: <FaWallet />, path: "/profile/wallet" },
    // {
    //   name: `Notifications`,
    //   icon: <FaBell />,
    //   path: "/profile/notifications",
    // },
    // {
    //   name: `Re-schedule`,
    //   icon: <AiOutlineSchedule />,
    //   path: "/profile/re-schedule",
    // },
    { name: "My Profile", icon: <FaUser />, path: "/profile/user" },
  ];

  return (
    <>
      {/* Bottom Bar for Mobile Devices */}
      <div
        className={`md:hidden fixed bottom-0 left-0 w-full bg-hash  flex justify-around items-center p-4 transition-all duration-200`}
      >
        {bottomBarItemsDefault.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            className={`flex flex-col items-center ${
              isActive(item.path) ? "text-primary" : "text-white"
            }`}
          >
            {item.icon}
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
