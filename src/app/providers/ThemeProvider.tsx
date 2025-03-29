"use client";
import { useGetUserDataQuery } from "@/redux/api/userApi/userApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { mainTheme } from "@/utils/antTheme";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";

import { ReactNode, useEffect } from "react";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useGetUserDataQuery(undefined);
  console.log(data);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setUser({
        user: data?.data,
      })
    );
  }, [data?.data, dispatch]);

  return <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>;
};

export default ThemeProvider;
