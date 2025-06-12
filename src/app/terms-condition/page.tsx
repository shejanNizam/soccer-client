"use client";

import Footer from "@/components/Footer/Footer";
import { useGetTermsQuery } from "@/redux/features/common/commonApi";
import localImage from "../../assets/about/about-us.png";

export default function Terms() {
  const { data } = useGetTermsQuery({});
  console.log(data);
  return (
    <>
      <div className="min-h-screen bg-secondary">
        <div
          className="relative h-64 text-center bg-cover bg-center py-40"
          style={{ backgroundImage: `url(${localImage.src})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          <h3 className="text-4xl font-bold text-primary relative z-10">
            Terms and Condition
          </h3>
          {/* <p className=" md:w-[30%] mx-auto text-white relative z-10">
            We provide live scores, match updates, news, streaming, stats, and
            ticket booking for soccer fans worldwide. Stay connected to the
            game!
          </p> */}
        </div>

        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Render the HTML content from the API */}
          {data?.data?.content && (
            <div
              className="p-6 rounded-lg shadow-md mb-8 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: data.data.content }}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
