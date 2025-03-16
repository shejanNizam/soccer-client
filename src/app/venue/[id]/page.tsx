// app/venues/[id]/page.tsx
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import VENUE_IMG from "../../../assets/venue_img.png";

type Venue = {
  _id: number;
  name: string;
  address: string;
  image: StaticImageData;
  title: string;
  description: string;
  price: number;
  point: number;
  maxCapacity: number;
  details: string;
};

// Dummy JSON data
const venues: Venue[] = [
  {
    _id: 1,
    image: VENUE_IMG,
    name: "Wembley Stadium",
    address: "USA, New York, New York",
    title: "Wembley Stadium",
    description:
      'Known as the "Home of Football," hosts major finals and international matches.',
    price: 9,
    point: 9,
    maxCapacity: 15,
    details:
      "It has a 90,000-seat capacity and a retractable roof. The floor extends a little wide, allowing easy access to all areas. The venue is equipped with state-of-the-art facilities, including a large number of connected buildings and natural resources. It is designed to meet the needs of large-scale events and provides a safe and secure environment for all visitors.",
  },
  {
    _id: 2,
    image: VENUE_IMG,
    name: "Wembley Stadium",
    address: "USA, New York, New York",
    title: "Wembley Stadium",
    description:
      'Known as the "Home of Football," hosts major finals and international matches.',
    price: 9,
    point: 9,
    maxCapacity: 15,
    details:
      "It has a 90,000-seat capacity and a retractable roof. The floor extends a little wide, allowing easy access to all areas. The venue is equipped with state-of-the-art facilities, including a large number of connected buildings and natural resources. It is designed to meet the needs of large-scale events and provides a safe and secure environment for all visitors.",
  },
  {
    _id: 3,
    image: VENUE_IMG,
    name: "Wembley Stadium",
    address: "USA, New York, New York",
    title: "Wembley Stadium",
    description:
      'Known as the "Home of Football," hosts major finals and international matches.',
    price: 9,
    point: 9,
    maxCapacity: 15,
    details:
      "It has a 90,000-seat capacity and a retractable roof. The floor extends a little wide, allowing easy access to all areas. The venue is equipped with state-of-the-art facilities, including a large number of connected buildings and natural resources. It is designed to meet the needs of large-scale events and provides a safe and secure environment for all visitors.",
  },
  // Add more venues as needed
];

export default function VenueDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const venue = venues.find((v) => v._id === parseInt(params.id));

  if (!venue) {
    return <div>Venue not found</div>;
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="max-w-4xl mx-auto bg-secondary rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative h-64 md:h-96">
          <Image
            src={venue.image}
            alt="Venue Image"
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>

        {/* Details Section */}
        <div className="p-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-primary mb-4">
              {venue.title}
              <p className="text-primary text-sm"> {venue.address} </p>
            </h1>
            <div className="">
              <div className="flex items-center text-2xl">
                <span className=" font-semibold mr-2">Price:</span>
                <span className=" text-yellow-500">${venue.price}</span>
              </div>
              <div className="flex items-center mb-6 text-2xl">
                <span className=" font-semibold mr-2">Point:</span>
                <span className=" text-yellow-500">{venue.point}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center mb-6 text-primary">
            <span className="text-lg font-semibold  mr-2">Max Capacity:</span>
            <span className="text-xl fong-bold">{venue.maxCapacity}</span>
          </div>
          <p className=" mb-8">{venue.details}</p>
          <Link href={`/book-venue`}>
            <button className="bg-button hover:bg-button/90 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
