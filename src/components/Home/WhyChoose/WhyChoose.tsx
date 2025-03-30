import CustomHeading from "@/lib/CustomHeading/CustomHeading";
import Image from "next/image";
import choose_image from "../../../assets/home/choose/choose_img.png";

export default function WhyChooseUs() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Heading */}
      <CustomHeading>Why Choose Us</CustomHeading>

      {/* Content Container */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 xl:px-40">
        {/* Image on the left (or top on smaller screens) */}
        <div className="w-full lg:w-1/2">
          <Image
            src={choose_image}
            alt="Soccer Image"
            width={1000}
            height={1000}
            className="rounded-xl w-full h-auto"
          />
        </div>

        {/* Content on the right (or bottom on smaller screens) */}
        <div className="w-full lg:w-1/2  relative">
          {/* Vertical Line */}
          <div className=" absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>

          {/* List of Features */}
          <ul className="space-y-0 ml-6 md:ml-0">
            <li className="flex items-start">
              <div className=" absolute left-0 w-5 h-5 bg-primary rounded-full -ml-2"></div>
              <div className="lg:ml-8">
                <h3 className="text-lg sm:text-xl text-primary font-semibold">
                  Latest Soccer News & Updates
                </h3>
                <p className="text-sm sm:text-base">
                  Stay ahead with real-time match results, transfer news, and
                  in-depth analysis from top leagues worldwide.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className=" absolute left-0 w-5 h-5 bg-primary rounded-full -ml-2"></div>
              <div className="lg:ml-8">
                <h3 className="text-lg sm:text-xl text-primary font-semibold">
                  Live Match Streaming & Highlights
                </h3>
                <p className="text-sm sm:text-base">
                  Watch live games, replays, and exclusive highlights with
                  high-quality streaming options.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className=" absolute left-0 w-5 h-5 bg-primary rounded-full -ml-2"></div>
              <div className="lg:ml-8">
                <h3 className="text-lg sm:text-xl text-primary font-semibold">
                  Easy Ticket Booking
                </h3>
                <p className="text-sm sm:text-base">
                  Secure your seats for upcoming matches with our seamless
                  ticketing system and exclusive discounts.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className=" absolute left-0 w-5 h-5 bg-primary rounded-full -ml-2"></div>
              <div className="lg:ml-8">
                <h3 className="text-lg sm:text-xl text-primary font-semibold">
                  Match Schedules & Stats
                </h3>
                <p className="text-sm sm:text-base">
                  Get detailed fixtures, team fixtures, player statistics, and
                  head-to-head comparisons to stay informed.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
