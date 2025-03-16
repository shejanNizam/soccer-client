import { Button } from "antd";
import Link from "next/link";
import BANNER_BG_IMAGE from "../../../assets/home/banner_bg.png";

export default function Banner() {
  return (
    <div
      className="h-auto min-h-[400px] md:min-h-[700px] bg-cover bg-center bg-no-repeat w-full pt-16 pb-4 md:pt-40 lg:pt-60"
      style={{
        backgroundImage: `url(${BANNER_BG_IMAGE.src})`,
      }}
    >
      <div className="container px-4 lg:pl-32 xl:pl-48">
        <h1 className="md:w-[80%] xl:w-[70%] text-3xl md:text-5xl xl:text-6xl font-bold text-primary ">
          Ultimate Soccer Hub Scores, News, and Highlights
        </h1>
        <p className="md:w-[70%] xl:w-[50%] text-primary font-medium text-base sm:text-lg md:text-xl mt-4">
          Stay updated with the latest soccer news, live scores, match
          highlights, player stats, and expert analysis from leagues worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 py-6">
          <Link href="/about">
            <Button type="primary" className="w-full sm:w-auto">
              About Us
            </Button>
          </Link>
          <Link href="/venue">
            <Button type="primary" className="w-full sm:w-auto">
              Venue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
