"use client";

import Banner from "@/components/Home/Banner/Banner";
import Faq from "@/components/Home/Faq/Faq";
import Featured from "@/components/Home/Featured/Featured";
import GetInTouch from "@/components/Home/GetInTouch/GetInTouch";
import WhyChoose from "@/components/Home/WhyChoose/WhyChoose";
import BottomBar from "@/components/profile/BottomBar/BottomBar";

export default function Home() {
  return (
    <div className="bg-secondary">
      <Banner />
      <div className="container">
        <Featured />
        <WhyChoose />
        <Faq />
        <GetInTouch />
      </div>
      <BottomBar />
    </div>
  );
}
