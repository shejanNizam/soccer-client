"use client";

import { useGetVenueQuery } from "@/redux/features/venue/venueApi";
import { Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import VENUE_IMG from "../../assets/venue_img.svg";

type Address = {
  country: string;
  state: string;
  city: string;
};

type CoverPhoto = {
  url: string;
  path: string;
};

type Venue = {
  id: string;
  name: string;
  title: string;
  description: string;
  address: Address;
  coverPhoto: CoverPhoto;
  startTime: string;
  endTime: string;
  scheduleDuration: number;
  price: number;
  points: number;
  maxCapacity: number;
  createdAt: string;
};

const Venue = () => {
  const { data, isLoading } = useGetVenueQuery([]);
  const venues = data?.data?.results || [];
  const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-64">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="min-h-screen py-40">
      <header className="text-center mb-8">
        <h1 className="text-4xl text-primary font-bold">Venue</h1>
        <p className="mt-4 md:w-[40%] mx-auto text-white">
          Book a soccer venue effortlessly for matches, training, or events.
          Choose top facilities, check availability, and secure your spot
          online. Perfect for teams, tournaments, and casual games. Reserve now!
        </p>
      </header>

      <div className="space-y-8 md:w-[60%] mx-auto">
        {venues?.map((venue: Venue) => (
          <div
            key={venue?.id}
            className="flex flex-col md:flex-row items-center w-full rounded overflow-hidden shadow-lg"
          >
            {/* Left Side: Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto ">
              <Image
                src={
                  venue?.coverPhoto?.url
                    ? `${baseImageUrl}${venue?.coverPhoto?.url}`
                    : VENUE_IMG
                }
                alt={venue.name || "Venue Image"}
                width={500}
                height={300}
                className="w-full h-full object-cover rounded-xl px-4 md:px-0"
              />
            </div>

            {/* Right Side: Text and Buttons */}
            <div className="w-full md:w-1/2 p-6 flex flex-col">
              <div>
                <h1 className="text-4xl text-primary font-bold mb-2">
                  {venue.name}
                </h1>
                <h4 className="font-bold text-xl mb-2 text-white">
                  {venue.title}
                </h4>
                <p className="mb-2 text-white">{venue.description}</p>
              </div>

              <div className="mt-4 flex gap-2">
                <Link href={`/venue/${venue.id}`}>
                  <button className="bg-button hover:bg-button/90 text-white font-bold py-2 px-4 rounded">
                    Details
                  </button>
                </Link>
                <Link href={`/book-venue?venueId=${venue.id}`}>
                  <button className="bg-button hover:bg-button/90 text-white font-bold py-2 px-4 rounded">
                    Book now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Venue;
