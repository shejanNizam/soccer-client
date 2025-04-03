"use client";

import { useAllNotificationsQuery } from "@/redux/features/notifications/notificationsApi";
import { Pagination, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

interface Notification {
  title: string;
  message: string;
  receiverId: string;
  viewStatus: boolean;
  createdAt: string;
}

// interface ApiResponse {
//   code: number;
//   message: string;
//   data: {
//     results: Notification[];
//     page: number;
//     limit: number;
//     totalPages: number;
//     totalResults: number;
//     nextPage: number | null;
//     previousPage: number | null;
//   };
// }

export default function Notifications() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 15;

  // Fetch notifications with pagination
  const { data: apiResponse, isLoading } = useAllNotificationsQuery(
    {
      page: currentPage,
      limit: pageSize,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // Extract data from the response
  const notifications = apiResponse?.data?.results || [];
  const pagination = apiResponse?.data || {
    page: 1,
    limit: pageSize,
    totalPages: 1,
    totalResults: 0,
  };

  const handleBack = () => {
    router.back();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="bg-secondary min-h-screen px-4 py-8 md:py-0">
      {/* Header */}
      <div className="sticky top-20 flex justify-start items-start gap-2 bg-primary rounded-t-md h-20 text-secondary py-8 pl-8 font-bold">
        <button onClick={handleBack}>
          <IoIosArrowBack size={28} />
        </button>
        <h2 className="text-2xl font-semibold">All Notifications</h2>
      </div>

      {/* Notifications list */}
      <div className="ml-6">
        {notifications.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            No notifications available
          </div>
        ) : (
          notifications.map((notification: Notification) => (
            <div
              key={`${notification.receiverId}-${notification.createdAt}`}
              className={`flex justify-start items-center gap-4 m-4 p-3 rounded-lg ${
                notification.viewStatus ? "shadow-2xl" : "bg-hash"
              }`}
            >
              <IoNotificationsOutline className="bg-[#E8EAEF] w-[40px] h-[40px] rounded-sm text-secondary p-2" />
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {notification.title}
                </h3>
                <p className="text-white">{notification.message}</p>
                <p className="text-gray-400 text-sm mt-1">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Server-side pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            current={currentPage}
            pageSize={pagination.limit}
            total={pagination.totalResults}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}
