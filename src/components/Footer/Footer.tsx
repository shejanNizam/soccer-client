"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import main_logo from "../../assets/mail_logo_img.png";

const Footer = () => (
  <footer className="hidden md:block bg-hash text-white py-8 w-full">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0">
          <Link href="/" className="text-xl font-bold text-gray-800">
            <Image width={70} height={70} src={main_logo} alt="main_logo" />
          </Link>
          <p className="mt-2 text-sm">
            A soccer website providing news, live scores, analysis,
            <br /> training tips, gear, and a passionate community <br /> for
            fans worldwide. Stay connected!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="mr-6">
            <h3 className="font-semibold text-primary text-xl mb-2">Explore</h3>
            <ul>
              <li className="mb-1">
                <Link href="/" className="text-sm hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/about-us" className="text-sm hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/contact" className="text-sm hover:text-gray-900">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
          <div className="mr-6">
            <h3 className="font-semibold text-primary text-xl mb-2">
              Utility Pages
            </h3>
            <ul>
              <li className="mb-1">
                <Link
                  href="/privacy-policy"
                  className="text-sm hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  href="/terms-of-use"
                  className="text-sm hover:text-gray-900"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
          <div className="mr-6">
            <h3 className="font-semibold text-primary text-xl mb-2">
              Get In Touch
            </h3>
            <ul>
              <li className="mb-1">
                <Link href="/faq" className="text-sm hover:text-gray-900">
                  peardup@gmail.com
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/support" className="text-sm hover:text-gray-900">
                  (009)56567890g
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="my-6 border-t border-gray-300" />
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2" />
            <span className="text-sm">
              1234 Street Name, City, State, 56789
            </span>
          </div>
          <div className="flex items-center mb-2">
            <FaEnvelope className="mr-2" />
            <span className="text-sm">info@mycompany.com</span>
          </div>
          <div className="flex items-center">
            <FaPhoneAlt className="mr-2" />
            <span className="text-sm">(123) 456-7890</span>
          </div>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="https://facebook.com" className=" hover:text-gray-900">
            <FaFacebookF />
          </Link>
          <Link href="https://twitter.com" className=" hover:text-gray-900">
            <FaTwitter />
          </Link>
          <Link href="https://instagram.com" className=" hover:text-gray-900">
            <FaInstagram />
          </Link>
          <Link href="https://linkedin.com" className=" hover:text-gray-900">
            <FaLinkedinIn />
          </Link>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
