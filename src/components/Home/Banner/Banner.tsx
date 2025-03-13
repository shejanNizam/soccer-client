import { Button } from "antd";
import Link from "next/link";
import BANNER_BG_IMAGE from "../../../assets/home/banner_bg.png";

export default function Banner() {
  return (
    <>
      <div
        className="h-auto lg:h-[520px] bg-cover bg-center bg-no-repeat w-full pt-40"
        style={{
          backgroundImage: `url(${BANNER_BG_IMAGE.src})`,
        }}
      >
        <div className="container md:pl-48">
          <h1 className="text-xl md:text-6xl font-bold text-primary ">
            {" "}
            Ultimate Soccer Hub Scores, <br /> News, and Highlights{" "}
          </h1>
          <p className="text-primary font-medium md:text-xl ">
            Stay updated with the latest soccer news, live scores, match
            highlights, <br /> player stats, and expert analysis from leagues
            worldwide.
          </p>

          <div className="flex gap-4 py-4">
            <Link href={`/about`}>
              <Button type="primary">About Us</Button>
            </Link>
            <Link href={`/venue`}>
              <Button type="primary">Venue</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
