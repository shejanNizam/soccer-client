"use client";

import { useGetVenueByIdQuery } from "@/redux/features/venue/venueApi";
import { Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import VENUE_IMG from "../../../assets/venue_img.png";

// type Address = {
//   country: string;
//   state: string;
//   city: string;
// };

// type CoverPhoto = {
//   url: string;
//   path: string;
// };

// type Venue = {
//   id: string;
//   name: string;
//   title: string;
//   address: Address;
//   coverPhoto: CoverPhoto;
//   startTime: string;
//   endTime: string;
//   scheduleDuration: number;
//   description: string;
//   price: number;
//   points: number;
//   maxCapacity: number;
//   createdAt: string;
// };

export default function VenueDetailPage() {
  const params = useParams();
  const { id } = params;
  // console.log(id);
  const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  const { data, isLoading } = useGetVenueByIdQuery(id as string);
  const venue = data?.data;

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spin size="large" />
      </div>
    );
  const formattedAddress = `${venue.address?.city}, ${venue.address?.state}, ${venue.address?.country}`;
  // const imageUrl = venue.coverPhoto?.url
  //   ? venue.coverPhoto.url.startsWith("http")
  //     ? venue.coverPhoto.url
  //     : baseImageUrl + venue.coverPhoto.url
  //   : VENUE_IMG;

  return (
    <div className="min-h-screen bg-secondary py-40">
      <div className="max-w-4xl mx-auto  rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative h-64 md:h-96 ">
          <Image
            src={
              venue.coverPhoto.url
                ? baseImageUrl + venue.coverPhoto.url
                : VENUE_IMG
            }
            alt={venue.name || "Venue Image"}
            fill
            className="object-cover rounded-xl px-4 md:px-0"
            priority
          />
        </div>

        {/* Details Section */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between gap-12 items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {venue.name}
              </h1>
              <p className="text-lg text-gray-300 mb-2">{venue.title}</p>
              <p className="text-primary text-sm">{formattedAddress}</p>
            </div>

            <div className="mt-4 md:mt-0">
              <div className="flex items-center text-xl md:text-2xl">
                <span className="font-semibold mr-2">Price:</span>
                <span className="text-yellow-500">${venue.price}</span>
              </div>
              <div className="flex items-center text-xl md:text-2xl">
                <span className="font-semibold mr-2">Points:</span>
                <span className="text-yellow-500">{venue.points}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center text-primary">
              <span className="text-lg font-semibold mr-2">Max Capacity:</span>
              <span className="text-lg font-bold">
                {venue.maxCapacity} people
              </span>
            </div>
            <div className="flex items-center text-primary mt-2">
              <span className="text-lg font-semibold mr-2">Opening Hours:</span>
              <span className="text-lg">
                {venue.startTime} - {venue.endTime}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="whitespace-pre-line">{venue.description}</p>
          </div>

          <Link href={`/book-venue?venueId=${venue.id}`}>
            <button className="bg-button hover:bg-button/90 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
