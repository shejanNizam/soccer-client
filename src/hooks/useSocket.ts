"use client";

import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export const useSocket = (
  onNewNotification: (notification: {
    id: string;
    message: string;
    timestamp: string;
  }) => void
) => {
  interface User {
    id: string;
    name: string;
    email: string;
    profileImage?: { url: string };
    // Add other fields as per your user object structure
  }

  const { user } = useSelector(
    (state: { auth: { user: User | null } }) => state.auth
  );
  // একাধিক কানেকশন এড়াতে useMemo ব্যবহার করা হচ্ছে
  const socket: Socket = useMemo(() => io(SOCKET_URL), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    // ব্যাকএন্ড থেকে "newNotification" ইভেন্টের মাধ্যমে নতুন নোটিফিকেশন পাওয়ার জন্য লিসেন করা হচ্ছে
    socket.on(`notification::${user?.id}`, (notification) => {
      // socket.on(`notification::${userId}`, (notification) => {
      console.log("New notification received:", notification);
      onNewNotification(notification);
    });

    // কম্পোনেন্ট আনমাউন্ট হলে ক্লিনআপ করা হচ্ছে
    return () => {
      socket.off(`notification::${user?.id}`);
      socket.disconnect();
    };
  }, [socket, onNewNotification, user?.id]);

  return socket;
};
