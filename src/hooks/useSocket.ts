"use client";

import { useEffect, useMemo } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

export const useSocket = (
  onNewNotification: (notification: {
    id: string;
    message: string;
    timestamp: string;
  }) => void
) => {
  // একাধিক কানেকশন এড়াতে useMemo ব্যবহার করা হচ্ছে
  const socket: Socket = useMemo(() => io(SOCKET_URL), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    // ব্যাকএন্ড থেকে "newNotification" ইভেন্টের মাধ্যমে নতুন নোটিফিকেশন পাওয়ার জন্য লিসেন করা হচ্ছে
    socket.on("newNotification", (notification) => {
      console.log("New notification received:", notification);
      onNewNotification(notification);
    });

    // কম্পোনেন্ট আনমাউন্ট হলে ক্লিনআপ করা হচ্ছে
    return () => {
      socket.off("newNotification");
      socket.disconnect();
    };
  }, [socket, onNewNotification]);

  return socket;
};
