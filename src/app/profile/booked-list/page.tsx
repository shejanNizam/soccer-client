"use client";

import { Tabs } from "antd";
import BookedListTable from "./BookedListTable";

const { TabPane } = Tabs;

export default function BookListTab() {
  return (
    <div className="p-4 bg-secondary rounded-lg shadow-sm min-h-screen">
      <Tabs defaultActiveKey="1" aria-label="Wallet Tabs">
        <TabPane
          tab={<span className="font-bold text-xl text-white">Approved</span>}
          key="1"
        >
          <BookedListTable status="approved" />
        </TabPane>
        <TabPane
          tab={<span className="font-bold text-xl text-white">Pending</span>}
          key="2"
        >
          <BookedListTable status="pending" />
        </TabPane>
        <TabPane
          tab={
            <span className="font-bold text-xl text-white">Re-Schedule</span>
          }
          key="3"
        >
          <BookedListTable status="re-schedule" />
        </TabPane>
      </Tabs>
    </div>
  );
}
