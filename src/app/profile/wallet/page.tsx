"use client";

import { Tabs } from "antd";

import RecentWalletHistory from "./RecentWalletHistory";
import WalletBalance from "./WalletBalance";

const { TabPane } = Tabs;

export default function Wallet() {
  return (
    <div className="p-4 bg-secondary rounded-lg shadow-sm">
      <Tabs defaultActiveKey="1" aria-label="Wallet Tabs">
        <TabPane
          tab={<span className="font-bold text-xl text-white">Points</span>}
          key="1"
        >
          <div className="flex flex-col md:flex-row justify-center items-center">
            <WalletBalance paymentType="point" />
            <RecentWalletHistory paymentType="point" />
          </div>
        </TabPane>
        <TabPane
          tab={<span className="font-bold text-xl text-white">Payments</span>}
          key="2"
        >
          <div className="flex flex-col md:flex-row justify-center items-center">
            <WalletBalance paymentType="card" />
            <RecentWalletHistory paymentType="card" />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
