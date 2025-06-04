import CustomHeading from "@/lib/CustomHeading/CustomHeading";
import Image from "next/image";
import choose_image from "../../../assets/home/choose/choose_img.svg";

export default function WhyChooseUs() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Heading */}
      <CustomHeading>WHY CHOOSE US</CustomHeading>

      {/* Content Container */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 xl:px-40">
        {/* Image on the left (or top on smaller screens) */}
        <div className="w-full lg:w-1/2">
          <Image
            src={choose_image}
            alt="Soccer Image"
            width={1000}
            height={1000}
            className="rounded-xl w-full h-auto object-cover"
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
                  The convenience of playing around your schedule.
                </h3>
                <p className="text-sm sm:text-base text-white">
                  Create a profile, look up the day and time you want to play
                  and .
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className=" absolute left-0 w-5 h-5 bg-primary rounded-full -ml-2"></div>
              <div className="lg:ml-8">
                <h3 className="text-lg sm:text-xl text-primary font-semibold">
                  No long-term commitments.
                </h3>
                <p className="text-sm sm:text-base text-white">
                  No need to stress about joining a team and hoping you get
                  enough playing time. Simply pay to play the day and time you
                  want to play, and come back as many times as you want!
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className=" absolute left-0 w-5 h-5 bg-primary rounded-full -ml-2"></div>
              <div className="lg:ml-8">
                <h3 className="text-lg sm:text-xl text-primary font-semibold">
                  We organize pick-up games.
                </h3>
                <p className="text-sm sm:text-base text-white">
                  With limited spots, it's first come first serve. Play
                  king-of-the-court with plenty of playing time.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className=" absolute left-0 w-5 h-5 bg-primary rounded-full -ml-2"></div>
              <div className="lg:ml-8">
                <h3 className="text-lg sm:text-xl text-primary font-semibold">
                  Tell your friends!
                </h3>
                <p className="text-sm sm:text-base text-white">
                  You and your friends can pick a time and date, with enough
                  available spots, and show us what you got!
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
