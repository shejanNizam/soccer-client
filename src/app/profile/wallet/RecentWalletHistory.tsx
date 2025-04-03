"use client";
import { useGetWalletQuery } from "@/redux/features/wallet/walletApi";
import { List, Pagination, Tag, Typography } from "antd";
import { format } from "date-fns";
import { useState } from "react";

const { Title, Text } = Typography;

interface RecentWalletHistoryProps {
  paymentType: string;
}

export default function RecentWalletHistory({
  paymentType,
}: RecentWalletHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // You can adjust this as needed

  // Fetch data with pagination parameters
  const { data, isLoading } = useGetWalletQuery({
    paymentType,
    page: currentPage,
    limit: pageSize,
  });

  const historyData = data?.data?.transactionList || [];
  const totalItems = data?.data?.totalResults || 0;

  const getTransactionLabel = (paymentType: string) => {
    switch (paymentType) {
      case "point":
        return "Points Transaction";
      // Add more cases as needed for other payment types
      default:
        return "Transaction";
    }
  };

  interface Transaction {
    id: string;
    paymentType: string;
    points: number;
    createdAt: string;
  }

  const formattedTransactions: {
    label: string;
    amount: string;
    date: string;
    color: string;
    key: string;
  }[] = historyData.map((transaction: Transaction) => {
    return {
      label: getTransactionLabel(transaction.paymentType),
      amount:
        transaction.paymentType === "point"
          ? `+ ${transaction.points} pts`
          : `- ${transaction.points} pts`,
      date: format(new Date(transaction.createdAt), "dd MMM yyyy, hh:mm a"),
      color: "green", // You can adjust this based on your logic
      key: transaction.id,
    };
  });

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full sm:w-96 mx-auto">
      <Title level={4} className="text-gray-800 mb-6">
        Recent History
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={formattedTransactions}
        loading={isLoading}
        renderItem={(item) => (
          <List.Item
            className="hover:bg-gray-50 rounded transition"
            key={item.key}
          >
            <List.Item.Meta
              title={<Text strong>{item.label}</Text>}
              description={<Text type="secondary">{item.date}</Text>}
            />
            <Tag
              color={item.color === "green" ? "green" : "volcano"}
              style={{ fontWeight: "bold" }}
            >
              {item.amount}
            </Tag>
          </List.Item>
        )}
      />
      {totalItems > 0 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={["5", "10", "15", "20"]}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
          />
        </div>
      )}
    </div>
  );
}
