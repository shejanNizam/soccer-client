"use client";

import { logout } from "@/redux/slices/authSlice";
import { Dropdown, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaBars, FaBell, FaTimes } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import main_logo_img from "../../assets/mail_logo_img.png";

import default_img from "../../assets/user_img_default.png";

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

export default function Navbar() {
  const dispatch = useDispatch();
  interface User {
    role: string;
    image?: string;
  }

  const { user } = useSelector((state: { auth: { user: User } }) => state.auth);

  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

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
          localStorage.removeItem("selectedCategory");
          router.push("/login");
        });
      }
    });
  };

  return (
    <>
      <nav className=" bg-hash shadow-md fixed w-full py-4 z-50">
        <div className="md:container">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between h-16">
              {/* Logo Section */}
              <div className="flex-shrink-0 flex items-center">
                <Link
                  href="/"
                  className="text-xl font-bold text-gray-800"
                  onClick={closeMenu}
                >
                  <div>
                    <div className="flex justify-center items-center gap-4 p-4 md:p-0">
                      <Image
                        width={70}
                        height={70}
                        src={main_logo_img}
                        alt="main_logo"
                      />
                      {/* <h2 className="text-primary font-semibold text-3xl">
                        Soccersocial
                      </h2> */}
                    </div>
                  </div>
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex md:items-center space-x-4">
                <div
                  className={`flex space-x-4 ${
                    user?.role === "user" ? " text-center " : ""
                  }`}
                >
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium hover:text-primary ${
                        isActive(item.href)
                          ? "text-button underline"
                          : "text-primary/80 hover:text-primary"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <Link
                    href="/profile/notifications"
                    className="ml-4 text-primary hover:text-primary/90"
                  >
                    <FaBell size={24} />
                  </Link>

                  {user ? (
                    <>
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
                        <div className="flex justify-start items-center gap-2 cursor-pointer">
                          <Image
                            width={1000}
                            height={1000}
                            className="w-12 h-12 rounded-full border-4 border-primary"
                            src={
                              user?.image
                                ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${user.image}`
                                : default_img
                            }
                            alt="profile_image"
                          />
                          <TiArrowSortedDown />
                        </div>
                      </Dropdown>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Link
                        href="/login"
                        className="px-4 py-2 bg-button text-primary border border-primary rounded-md text-sm font-medium hover:text-primary/90 hover:bg-button/90 transition duration-200"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
              </div>

              {/* Mobile Menu Button */}
              {/* <div className="flex items-center md:hidden">
              

              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition duration-200"
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
            </div> */}

              <div className="flex items-center md:hidden">
                <Link
                  href="/profile/notifications"
                  className="ml-4 text-primary hover:text-primary/90"
                >
                  <FaBell size={24} />
                </Link>
                <button
                  onClick={toggleMenu}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-button hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition duration-200"
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

          {/* Mobile Menu */}
          {/* Slide-in Sidebar for Mobile */}
          <div
            className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            aria-hidden={!isOpen}
          >
            {/* Overlay */}
            <div
              className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={closeMenu}
              aria-hidden="true"
            ></div>

            {/* Sidebar */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-64 bg-secondary shadow-lg transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out`}
            >
              {/* Logo and Close Button */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <Link
                  href="/"
                  className="text-xl font-bold text-gray-800"
                  onClick={closeMenu}
                >
                  <Image
                    width={70}
                    height={70}
                    src={main_logo_img}
                    alt="main_logo"
                  />
                </Link>
                <button
                  onClick={closeMenu}
                  className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                  aria-label="Close menu"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-4">
                {navigation.map((item) => (
                  <Link
                    href={item.href}
                    key={item.name}
                    onClick={closeMenu}
                    className={`flex items-center px-6 py-3 mt-2 ${
                      isActive(item.href)
                        ? "text-primary underline font-semibold"
                        : "text-primary hover:text-button"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Divider */}
                <hr className="my-4 border-gray-300" />

                {user ? (
                  <>
                    {" "}
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
                        className={`flex justify-start items-center gap-2 px-4 py-2 mt-2 cursor-pointer ${
                          pathname === "/profile/my-profile"
                            ? "text-primary underline font-semibold"
                            : "text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        <Image
                          width={1000}
                          height={1000}
                          className="w-16 h-16 rounded-full border-4 border-primary"
                          src={
                            user?.image
                              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${user.image}`
                              : default_img
                          }
                          alt="profile_image"
                        />
                        <TiArrowSortedDown />
                      </div>
                    </Dropdown>
                  </>
                ) : (
                  <>
                    {" "}
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="block px-6 py-3 mt-2 bg-button text-primary border border-primary rounded-md text-sm font-medium hover:text-white hover:bg-button/90 transition duration-200"
                    >
                      Login
                    </Link>
                  </>
                )}
                {/* Action Links */}
                {/* {user?.role === "user" ? (
                <>
                  <Link
                    href="/join-contractor"
                    onClick={closeMenu}
                    className="block px-6 py-3 mt-2 text-primary underline hover:text-primary transition duration-200"
                  >
                    Join as Contractor
                  </Link>
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
                      className={`flex justify-start items-center gap-2 px-4 py-2 mt-2 cursor-pointer ${
                        pathname === "/profile/my-profile"
                          ? "text-primary underline font-semibold"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <Image
                        width={1000}
                        height={1000}
                        className="w-16 h-16 rounded-full border-4 border-primary"
                        src={
                          user?.image
                            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${user.image}`
                            : default_img
                        }
                        alt="profile_image"
                      />
                      <TiArrowSortedDown />
                    </div>
                  </Dropdown>
                </>
              ) : user?.role === "provider" ? (
                <>
                  <Link
                    href="/projects"
                    onClick={closeMenu}
                    className="block px-6 py-3 mt-2 text-primary hover:text-button transition duration-200"
                  >
                    Projects
                  </Link>
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
                      className={`flex justify-start items-center gap-2 px-4 py-2 mt-2 cursor-pointer ${
                        pathname === "/profile/my-profile"
                          ? "text-primary underline font-semibold"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <Image
                        width={1000}
                        height={1000}
                        className="w-16 h-16 rounded-full border-4 border-primary"
                        src={
                          user?.image
                            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${user.image}`
                            : default_img
                        }
                        alt="profile_image"
                      />
                      <TiArrowSortedDown />
                    </div>
                  </Dropdown>
                </>
              ) : (
                <>
                  <>
                    <Link
                      href="/join-contractor"
                      onClick={closeMenu}
                      className="block px-6 py-3 mt-2 text-primary underline hover:text-primary transition duration-200"
                    >
                      Join as Contractor
                    </Link>
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="block px-6 py-3 mt-2 bg-button text-primary border border-primary rounded-md text-sm font-medium hover:text-white hover:bg-button/90 transition duration-200"
                    >
                      Login
                    </Link>
                  </>
                </>
              )} */}
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
