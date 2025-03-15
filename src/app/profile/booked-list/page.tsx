"use client";

import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import React from "react";

// Define the type for the data source
interface Booking {
  key: string;
  siNo: number;
  venueName: string;
  scheduleDate: string;
  scheduleTime: string;
  status: "Approved" | "Pending";
}

const dataSource: Booking[] = [
  {
    key: "1",
    siNo: 1,
    venueName: "Venue 1",
    scheduleDate: "2023-10-01",
    scheduleTime: "10:00 AM",
    status: "Approved",
  },
  {
    key: "2",
    siNo: 2,
    venueName: "Venue 2",
    scheduleDate: "2023-10-02",
    scheduleTime: "11:00 AM",
    status: "Pending",
  },
  {
    key: "3",
    siNo: 3,
    venueName: "Venue 1",
    scheduleDate: "2023-10-01",
    scheduleTime: "10:00 AM",
    status: "Approved",
  },
  {
    key: "4",
    siNo: 4,
    venueName: "Venue 2",
    scheduleDate: "2023-10-02",
    scheduleTime: "11:00 AM",
    status: "Pending",
  },
  {
    key: "5",
    siNo: 5,
    venueName: "Venue 1",
    scheduleDate: "2023-10-01",
    scheduleTime: "10:00 AM",
    status: "Approved",
  },
  {
    key: "6",
    siNo: 6,
    venueName: "Venue 2",
    scheduleDate: "2023-10-02",
    scheduleTime: "11:00 AM",
    status: "Pending",
  },
  {
    key: "7",
    siNo: 7,
    venueName: "Venue 2",
    scheduleDate: "2023-10-02",
    scheduleTime: "11:00 AM",
    status: "Pending",
  },
  {
    key: "8",
    siNo: 8,
    venueName: "Venue 2",
    scheduleDate: "2023-10-02",
    scheduleTime: "11:00 AM",
    status: "Pending",
  },
  {
    key: "9",
    siNo: 9,
    venueName: "Venue 2",
    scheduleDate: "2023-10-02",
    scheduleTime: "11:00 AM",
    status: "Pending",
  },
  {
    key: "10",
    siNo: 10,
    venueName: "Venue 2",
    scheduleDate: "2023-10-02",
    scheduleTime: "11:00 AM",
    status: "Pending",
  },
  {
    key: "11",
    siNo: 11,
    venueName: "Venue 2",
    scheduleDate: "2023-10-02",
    scheduleTime: "11:00 AM",
    status: "Pending",
  },
  {
    key: "12",
    siNo: 12,
    venueName: "Venue 2",
    scheduleDate: "2023-10-02",
    scheduleTime: "11:00 AM",
    status: "Pending",
  },
  // Add more data as needed
];

// Main component
const BookedList: React.FC = () => {
  const router = useRouter();

  const handleDetails = (record: Booking) => {
    router.push(`/booked-list/${record.key}`);
    console.log("Details clicked for:", record);
  };

  const columns: ColumnsType<Booking> = [
    {
      title: "SI No",
      dataIndex: "siNo",
      key: "siNo",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Venue Name",
      dataIndex: "venueName",
      key: "venueName",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Schedule Date",
      dataIndex: "scheduleDate",
      key: "scheduleDate",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Schedule Time",
      dataIndex: "scheduleTime",
      key: "scheduleTime",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: "Approved" | "Pending") => (
        <span style={{ color: status === "Approved" ? "green" : "orange" }}>
          {status}
        </span>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: Booking) => (
        <Button type="primary" onClick={() => handleDetails(record)}>
          Details
        </Button>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
  ];
  return (
    <div className="p-4">
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default BookedList;
