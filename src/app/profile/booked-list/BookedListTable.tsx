"use client";

import { useGetBookedListQuery } from "@/redux/features/venue/venueApi";
import { Button, DatePicker, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Booking {
  id: string;
  key: string;
  siNo: number;
  venueName: string;
  scheduleDate: string;
  scheduleTime: string;
  status: "approved" | "pending" | "re-schedule";
}

const BookedListTable: React.FC<{ status?: string }> = ({ status }) => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const { data, isLoading } = useGetBookedListQuery({
    status,
    date: selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : undefined,
  });

  console.log(data?.data?.results);

  // Transform API data to match table structure
  const dataSource =
    data?.data?.results?.map(
      (
        item: {
          id: string;
          transaction: string;
          timeRange: string;
          status: string;
          venue?: { name: string };
          createdAt: string;
        },
        index: number
      ) => ({
        id: item.id,
        key: item.id,
        siNo: index + 1,
        venueName: item.venue?.name || "Venue Name",
        scheduleDate: dayjs(item.createdAt).format("DD MMM YYYY"),
        scheduleTime: item.timeRange,
        status: item.status,
      })
    ) || [];

  const handleDetails = (record: Booking) => {
    router.push(`/profile/booked-list/${record.id}`);
  };

  const handleReschedule = (record: Booking) => {
    console.log("Re-schedule clicked for:", record);
  };

  const columns: ColumnsType<Booking> = [
    {
      title: "SI No",
      dataIndex: "siNo",
      key: "siNo",
    },
    {
      title: "Venue Name",
      dataIndex: "venueName",
      key: "venueName",
    },
    {
      title: "Schedule Date",
      dataIndex: "scheduleDate",
      key: "scheduleDate",
    },
    {
      title: "Schedule Time",
      dataIndex: "scheduleTime",
      key: "scheduleTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          style={{
            color:
              status === "approved"
                ? "green"
                : status === "pending"
                ? "orange"
                : "red",
            textTransform: "capitalize",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: Booking) =>
        record.status === "re-schedule" ? (
          <Button
            type="primary"
            danger
            onClick={() => handleReschedule(record)}
          >
            Re-schedule
          </Button>
        ) : (
          <Button type="primary" onClick={() => handleDetails(record)}>
            Details
          </Button>
        ),
    },
  ];

  return (
    <>
      <div className="p-4">
        <div className="mb-4 flex justify-end">
          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            allowClear
            placeholder="Filter by date"
            style={{ width: 200 }}
          />
        </div>

        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoading}
          pagination={{ pageSize: 15 }}
          scroll={{ x: true }}
        />
      </div>
    </>
  );
};

export default BookedListTable;
