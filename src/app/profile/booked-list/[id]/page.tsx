"use client";

import { useGetBookedListByIdQuery } from "@/redux/features/venue/venueApi";
import { Spin } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import VENUE_IMG from "../../../../assets/venue_img.png";

export default function BookedListDetails() {
  const params = useParams();
  const { id } = params;
  const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  const { data, isLoading } = useGetBookedListByIdQuery(id);

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spin size="large" />
      </div>
    );

  const venue = data?.data;
  const address = `${venue?.address.city}, ${venue?.address.state}, ${venue?.address.country}`;
  const time = `${venue?.startTime} - ${venue?.endTime}`;
  // const imageUrl = venue?.coverPhoto.url;
  const imageUrl = venue?.coverPhoto?.url
    ? venue?.coverPhoto.url.startsWith("http")
      ? venue?.coverPhoto.url
      : baseImageUrl + venue?.coverPhoto.url
    : VENUE_IMG;

  return (
    <div className="min-h-screen bg-secondary p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Flex container for image and details */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <Image
              src={imageUrl}
              alt="venue_image"
              width={600}
              height={400}
              className="rounded-xl object-cover w-full h-64 lg:h-auto"
            />
          </div>

          {/* Details */}
          <div className="w-full lg:w-1/2 text-primary">
            <h1 className="text-3xl lg:text-4xl font-bold">
              {venue?.name}
              <p className="text-sm text-gray-400 mt-2">{address}</p>
            </h1>
            <p className="text-xl lg:text-2xl mt-4">
              Price: ${venue?.price} / Points: {venue?.points}
            </p>
            <p className="text-xl lg:text-2xl mt-2">
              Max Capacity: {venue?.maxCapacity}
            </p>
            <p className="text-lg lg:text-xl mt-4">
              {new Date(venue?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              at {time}
            </p>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mt-8 lg:mt-12">
          <h2 className="text-xl lg:text-2xl font-bold">{venue?.title}</h2>
          <p className="mt-4 text-lg lg:text-xl">{venue?.description}</p>
        </div>
      </div>
    </div>
  );
}
