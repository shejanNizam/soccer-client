"use client";

import { useSocket } from "@/hooks/useSocket";
import {
  notificationsApi,
  useNotificationCountQuery,
} from "@/redux/features/notifications/notificationsApi";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { Badge, Dropdown, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FaBars, FaBell, FaTimes } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import main_logo_img from "../../assets/mail_logo_img.png";
import default_img from "../../assets/user_img_default.png";

export default function Navbar() {
  const dispatch = useAppDispatch();
  interface User {
    id: string;
    name: string;
    email: string;
    profileImage?: { url: string };
    // Add other fields as per your user object structure
  }

  const { user } = useSelector(
    (state: { auth: { user: User | null } }) => state.auth
  );
  console.log(user);
  const { data } = useNotificationCountQuery({});
  const [animateBadge, setAnimateBadge] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // নতুন নোটিফিকেশন এলে RTK Query cache আপডেট করার জন্য ফাংশন
  const handleNewNotification = useCallback(
    (notification: {
      id: string;
      message: string;
      timestamp: string;
      type?: string;
    }) => {
      // notifications list cache আপডেট: নতুন নোটিফিকেশনকে প্রথমে যোগ করা হচ্ছে
      dispatch(
        notificationsApi.util.updateQueryData(
          "allNotifications",
          undefined,
          (draft: {
            data: {
              results: {
                id: string;
                message: string;
                timestamp: string;
                type: string;
              }[];
            };
          }) => {
            draft.data.results.unshift({
              ...notification,
              type: notification.type || "default", // Provide a default value for type
            });
          }
        )
      );
      // notification count cache আপডেট: কাউন্ট ১ বাড়ানো হচ্ছে
      dispatch(
        notificationsApi.util.updateQueryData(
          "notificationCount",
          undefined,
          (draft: { data: { count: number } }) => {
            draft.data.count += 1;
          }
        )
      );

      // ব্যাজ অ্যানিমেশন ট্রিগার করা হচ্ছে
      setAnimateBadge(true);
      setTimeout(() => setAnimateBadge(false), 1000);
    },
    [dispatch]
  );

  // সকার্ট কানেকশন ইনিশিয়ালাইজ করা হচ্ছে
  useSocket(handleNewNotification);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Venue", href: "/venue" },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged out",
          text: "You have successfully logged out.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          dispatch(logout());
          localStorage.removeItem("user_token");
          router.push("/login");
        });
      }
    });
  };

  const ProfileMenu = ({
    handleLogout,
    closeMenu,
  }: {
    handleLogout: () => void;
    closeMenu: () => void;
  }) => (
    <Menu>
      <Menu.Item key="1">
        <Link
          className="font-bold text-primary"
          onClick={closeMenu}
          href="/profile/user"
        >
          My Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <div className="font-bold text-red-600" onClick={handleLogout}>
          Logout
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <nav className="bg-hash shadow-2xl fixed w-full py-2 z-50">
        <div className="px-4 md:container">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              {/* লোগো */}
              <Link href="/" onClick={closeMenu}>
                <Image
                  className="w-20 h-20"
                  width={1000}
                  height={1000}
                  src={main_logo_img}
                  alt="main_logo"
                />
              </Link>

              {/* ডেস্কটপ মেনু */}
              <div className="hidden md:flex">
                <div
                  className={`flex items-center space-x-2 ${
                    user ? " text-center " : ""
                  }`}
                >
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-4 font-semibold hover:text-button ${
                        isActive(item.href)
                          ? "text-button underline font-bold"
                          : "text-primary/80"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <Link
                    href="/profile/notifications"
                    className="text-primary hover:text-primary/90 pr-4"
                  >
                    <Badge
                      count="9"
                      // count={data?.data?.count || 0}
                      overflowCount={99}
                      className={animateBadge ? "animate-bounce" : ""}
                    >
                      <FaBell size={24} />
                    </Badge>
                  </Link>

                  {user ? (
                    <Dropdown
                      overlay={
                        <ProfileMenu
                          closeMenu={closeMenu}
                          handleLogout={handleLogout}
                        />
                      }
                      trigger={["click"]}
                      placement="bottomRight"
                    >
                      <div className="flex justify-center items-center gap-1 cursor-pointer">
                        <Image
                          width={1000}
                          height={1000}
                          className="w-16 h-16 rounded-full border-4 border-primary"
                          src={
                            user?.profileImage?.url
                              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${
                                  user?.profileImage?.url ?? ""
                                }`
                              : default_img.src
                          }
                          alt="profile_image"
                        />
                        <TiArrowSortedDown size={20} className="text-white" />
                      </div>
                    </Dropdown>
                  ) : (
                    <Link
                      href="/login"
                      className="px-4 py-2 bg-button text-primary border border-primary rounded-md text-sm font-medium hover:text-primary/90 hover:bg-button/90 transition duration-200"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>

              {/* মোবাইল ভিউ */}
              <div className="flex items-center md:hidden">
                <Link
                  href="/profile/notifications"
                  className="text-primary hover:text-primary/90 pr-4"
                >
                  <Badge
                    count="7"
                    // count={data?.data?.count || 0}
                    overflowCount={99}
                  >
                    <FaBell size={24} />
                  </Badge>
                </Link>
                <button
                  onClick={toggleMenu}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-button focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition duration-200"
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
                  aria-label="Toggle navigation menu"
                >
                  {isOpen ? (
                    <FaTimes className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* মোবাইল মেনু */}
          <div
            className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            aria-hidden={!isOpen}
          >
            {/* ওভারলে */}
            <div
              className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={closeMenu}
              aria-hidden="true"
            ></div>

            {/* সাইডবার */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-64 bg-secondary shadow-lg transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out`}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <Link
                  href="/"
                  className="text-xl font-bold text-gray-800"
                  onClick={closeMenu}
                >
                  <Image
                    className="w-20 h-20"
                    width={1000}
                    height={1000}
                    src={main_logo_img}
                    alt="main_logo"
                  />
                </Link>
                <button
                  onClick={closeMenu}
                  className="text-primary hover:text-primary/90 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                  aria-label="Close menu"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <nav className="mt-4">
                {navigation.map((item) => (
                  <Link
                    href={item.href}
                    key={item.name}
                    onClick={closeMenu}
                    className={`flex items-center px-6 py-3 mt-2 font-semibold hover:text-button ${
                      isActive(item.href)
                        ? "text-button underline font-bold"
                        : "text-primary/80"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <hr className="my-4 border-gray-500" />
                {user ? (
                  <Dropdown
                    overlay={
                      <ProfileMenu
                        closeMenu={closeMenu}
                        handleLogout={handleLogout}
                      />
                    }
                    trigger={["click"]}
                    placement="bottomRight"
                  >
                    <div
                      className={`flex justify-start items-center gap-1 px-4 py-2 mt-2 cursor-pointer ${
                        pathname === "/profile/my-profile"
                          ? "text-primary underline font-semibold"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <Image
                        width={1000}
                        height={1000}
                        className="w-16 h-16 rounded-full border-4 border-primary"
                        // src={
                        //   user?.profileImage?.url
                        //     ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${
                        //         user?.profileImage?.url ?? ""
                        //       }`
                        //     : default_img.src
                        // }
                        src={
                          user?.profileImage?.url
                            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${
                                user?.profileImage?.url ?? ""
                              }`
                            : default_img
                        }
                        alt="profile_image"
                      />
                      <TiArrowSortedDown size={20} className="text-white" />
                    </div>
                  </Dropdown>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="block px-6 py-3 mt-2 bg-button text-primary border border-primary rounded-md text-sm font-medium hover:text-white hover:bg-button/90 transition duration-200"
                  >
                    Login
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
