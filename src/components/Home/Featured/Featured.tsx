"use client";

import CustomHeading from "@/lib/CustomHeading/CustomHeading";
import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import Image, { StaticImageData } from "next/image";
import React, { useRef } from "react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import image5 from "../../../assets/home/featured/feature_five.png";
import image4 from "../../../assets/home/featured/feature_four.png";
import {
  default as image1,
  default as image6,
} from "../../../assets/home/featured/feature_one.png";
import {
  default as image3,
  default as image8,
} from "../../../assets/home/featured/feature_three.png";
import {
  default as image2,
  default as image7,
} from "../../../assets/home/featured/feature_two.png";

type ImageType = {
  id: number;
  name: string;
  src: StaticImageData;
};

const Featured: React.FC = () => {
  const sliderRef = useRef<CarouselRef | null>(null);

  const images: ImageType[] = [
    { id: 1, name: "image1.jpg", src: image1 },
    { id: 2, name: "image2.jpg", src: image2 },
    { id: 3, name: "image3.jpg", src: image3 },
    { id: 4, name: "image4.jpg", src: image4 },
    { id: 5, name: "image5.jpg", src: image5 },
    { id: 6, name: "image6.jpg", src: image6 },
    { id: 7, name: "image7.jpg", src: image7 },
    { id: 8, name: "image8.jpg", src: image8 },
  ];

  return (
    <div className="featured-section p-8 text-center ">
      <CustomHeading>FEATURED</CustomHeading>

      {/* Text */}
      <p className="text-lg  mb-8">
        Live secrets, match candidates, move, place stars, scenario, local
        backing, learn analysis,
        <br />
        Birthday blogs, but community, are overgain to plague.
      </p>

      <div className="relative max-w-6xl mx-auto">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
          onClick={() => sliderRef.current?.prev()}
        >
          <BiSolidLeftArrow className="text-3xl" />
        </button>

        {/* Carousel */}
        <Carousel
          dots={false}
          slidesToShow={5}
          slidesToScroll={5}
          ref={sliderRef}
          className="overflow-hidden px-12"
        >
          {images.map((image) => (
            <div key={image.id} className="p-2">
              <div className="w-full h-80 relative rounded-lg overflow-hidden">
                <Image
                  src={image.src}
                  alt={`Slide ${image.id}`}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                />
              </div>
            </div>
          ))}
        </Carousel>

        {/* Right Navigation Button */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
          onClick={() => sliderRef.current?.next()}
        >
          <BiSolidRightArrow className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default Featured;
