"use client";

import { useGetBookedListQuery } from "@/redux/features/venue/venueApi";
import { Button, DatePicker, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Booking {
  id: string;
  venue: { id: string; name: string };
  key: string;
  siNo: number;
  venueName: string;
  scheduleDate: string;
  scheduleTime: string;
  status: "approved" | "pending" | "re-schedule";
}

interface BookingTableProps {
  status?: string;
}

const BookedListTable = ({ status }: BookingTableProps) => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const { data, isLoading } = useGetBookedListQuery({
    status,
    date: selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : undefined,
  });

  const dataSource =
    data?.data?.results?.map(
      (
        item: {
          id: string;
          transaction: string;
          date: string;
          timeRange: string;
          status: string;
          venue: { id: string; name: string };
          createdAt: string;
        },
        index: number
      ) => ({
        id: item.id,
        key: item.id,
        siNo: index + 1,
        venue: item?.venue,
        venueName: item.venue.name || "Venue Name",
        scheduleDate: dayjs(item.date).format("DD MMM YYYY"),
        scheduleTime: item.timeRange,
        status: item.status,
      })
    ) || [];
  // console.log(dataSource);

  const handleDetails = (record: Booking) => {
    console.log(record);
    router.push(`/profile/booked-list/${record.venue?.id}`);
  };

  const handleReschedule = (record: Booking) => {
    router.push(`/book-venue?requestId=${record?.id}`);
    // router.push(`/book-venue`);
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
