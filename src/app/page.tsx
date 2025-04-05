"use client";

import Footer from "@/components/Footer/Footer";
import Banner from "@/components/Home/Banner/Banner";
import Faq from "@/components/Home/Faq/Faq";
import Featured from "@/components/Home/Featured/Featured";
import GetInTouch from "@/components/Home/GetInTouch/GetInTouch";
import WhyChoose from "@/components/Home/WhyChoose/WhyChoose";
import BottomBar from "@/components/profile/BottomBar/BottomBar";
import { useSelector } from "react-redux";

export default function Home() {
  interface User {
    id: string;
    name: string;
    email: string;
    profileImage?: { url: string };
  }

  const { user } = useSelector(
    (state: { auth: { user: User | null } }) => state.auth
  );
  return (
    <div className="bg-secondary">
      <Banner />
      <Featured />
      <WhyChoose />
      <Faq />
      <GetInTouch />
      <Footer />
      {/* bottom bar condiotionally show if user loggedin */}
      {user ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-secondary">
          <BottomBar />
        </div>
      ) : null}
    </div>
  );
}
