"use client";
import { useGetWalletQuery } from "@/redux/features/wallet/walletApi";
import { List, Pagination, Tag, Typography } from "antd";
import { format } from "date-fns";
import { useState } from "react";

const { Title, Text } = Typography;

interface RecentWalletHistoryProps {
  paymentType: string;
}

interface Transaction {
  id: string;
  paymentType: string;
  points?: number;
  amount?: number;
  createdAt: string;
  venue?: string;
  transactionId: string;
}

export default function RecentWalletHistory({
  paymentType,
}: RecentWalletHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading } = useGetWalletQuery({
    paymentType,
    page: currentPage,
    limit: pageSize,
  });

  const historyData = data?.data?.transactionList || [];
  const totalItems = data?.data?.totalResults || 0;

  const getTransactionLabel = (transaction: Transaction) => {
    switch (transaction.paymentType) {
      case "point":
        return "Points Transaction";
      case "card":
        return "Card Payment";
      default:
        return "Transaction";
    }
  };

  const getTransactionAmount = (transaction: Transaction) => {
    switch (transaction.paymentType) {
      case "point":
        return `+ ${transaction.points} pts`;
      case "card":
        return `- $${transaction.amount?.toFixed(2)}`;
      default:
        return "";
    }
  };

  const getTransactionColor = (transaction: Transaction) => {
    switch (transaction.paymentType) {
      case "point":
        return "green";
      case "card":
        return "volcano";
      default:
        return "blue";
    }
  };

  const formattedTransactions = historyData.map((transaction: Transaction) => ({
    label: getTransactionLabel(transaction),
    amount: getTransactionAmount(transaction),
    date: format(new Date(transaction.createdAt), "dd MMM yyyy, hh:mm a"),
    color: getTransactionColor(transaction),
    key: transaction.id,
  }));

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full sm:w-96 mx-auto">
      <Title level={4} className="text-gray-800 mb-6">
        Recent {paymentType === "point" ? "Points" : "Card"} History
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={
          formattedTransactions as Array<{
            label: string;
            amount: string;
            date: string;
            color: string;
            key: string;
          }>
        }
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
            <Tag color={item.color} style={{ fontWeight: "bold" }}>
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
