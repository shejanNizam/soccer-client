"use client";

import { useMarkAllReadMutation } from "@/redux/features/notifications/notificationsApi";
import { Pagination } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

interface Notification {
  _id: string;
  message: string;
  createdAt: string;
}

export default function Notifications() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);

  // কম্পোনেন্ট লোড হলে সব নোটিফিকেশন রিড করার জন্য মিউটেশন কল করা হচ্ছে
  const [markAllRead] = useMarkAllReadMutation();
  useEffect(() => {
    markAllRead({}); // Pass an empty object or the required argument based on your API's expectations
  }, [markAllRead]);

  // ডেমো ডেটার জন্য dummy data ব্যবহার করা হচ্ছে
  const dummyNotifications: Notification[] = [
    {
      _id: "1",
      message: "Your order has been shipped.",
      createdAt: "2023-10-01T12:00:00Z",
    },
    {
      _id: "2",
      message: "New message from support.",
      createdAt: "2023-10-02T14:30:00Z",
    },
    {
      _id: "3",
      message: "Your account has been updated.",
      createdAt: "2023-10-03T09:15:00Z",
    },
    {
      _id: "4",
      message: "Reminder: Your appointment is tomorrow.",
      createdAt: "2023-10-04T18:45:00Z",
    },
    {
      _id: "5",
      message: "Payment received for invoice #12345.",
      createdAt: "2023-10-05T11:00:00Z",
    },
    {
      _id: "6",
      message: "Your subscription is about to expire.",
      createdAt: "2023-10-06T16:20:00Z",
    },
  ];

  // Pagination এর জন্য ডেমো ডেটা ভাগ করা হচ্ছে
  const pageSize = 10;
  const totalData = dummyNotifications.length;
  const paginatedData = dummyNotifications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleBack = () => {
    router.back();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-secondary min-h-screen px-4 py-8 md:py-0">
      {/* হেডার */}
      <div className="sticky top-20 flex justify-start items-start gap-2 bg-primary rounded-t-md h-20 text-secondary py-8 pl-8 font-bold">
        <button onClick={handleBack}>
          <IoIosArrowBack size={28} />
        </button>
        <h2 className="text-2xl font-semibold">All Notifications</h2>
      </div>

      {/* নোটিফিকেশনস লিস্ট */}
      <div className="ml-6">
        {paginatedData.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            No notifications available
          </div>
        ) : (
          paginatedData.map((notification) => (
            <div
              key={notification._id}
              className="flex justify-start items-center gap-4 m-4"
            >
              <IoNotificationsOutline className="bg-[#E8EAEF] w-[40px] h-[40px] rounded-sm text-secondary p-2" />
              <div>
                <p className="text-xl text-white">{notification.message}</p>
                <p className="text-white">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination কম্পোনেন্ট */}
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalData}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
