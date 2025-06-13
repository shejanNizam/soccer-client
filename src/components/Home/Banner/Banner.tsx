import { Button } from "antd";
import Link from "next/link";
import BANNER_BG_IMAGE from "../../../assets/home/banner_bg.svg";

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
          Welcome to the best pick-up soccer games in El Paso!
        </h1>
        <p className="md:w-[70%] xl:w-[50%] text-primary font-medium text-base sm:text-lg md:text-xl mt-4">
          We hold organized pick-up soccer games. Pay to play, reserve the day
          and time you would like to play and come show us what you got! Ages
          +18. Coed games!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 py-6">
          <Link href="/about">
            <Button type="primary" className="w-full sm:w-auto">
              About Us
            </Button>
          </Link>
          <Link href="/venue">
            <Button type="primary" className="w-full sm:w-auto">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
