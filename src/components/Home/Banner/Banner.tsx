import { Button } from "antd";
import Link from "next/link";
import BANNER_BG_IMAGE from "../../../assets/home/banner_bg.png";

export default function Banner() {
  return (
    <div
      className="h-auto min-h-[400px] lg:min-h-[700px] bg-cover bg-center bg-no-repeat w-full pt-40 lg:pt-60"
      style={{
        backgroundImage: `url(${BANNER_BG_IMAGE.src})`,
      }}
    >
      <div className="container px-4 lg:pl-32 xl:pl-48">
        <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-primary">
          Ultimate Soccer Hub <br className="hidden sm:block" /> Scores, News,
          and Highlights
        </h1>
        <p className="text-primary font-medium text-base sm:text-lg md:text-xl mt-4">
          Stay updated with the latest soccer news, live scores, match
          highlights, <br className="hidden sm:block" /> player stats, and
          expert analysis from leagues worldwide.
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
