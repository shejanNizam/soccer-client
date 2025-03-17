import Image from "next/image";
import venue_image from "../../../../assets/venue_img.png";

const data = {
  name: "Wembley Stadium",
  image: venue_image,
  address: "USA, New York, New York",
  price: 9,
  points: 9,
  max_capacity: 15,
  date: "12 March 2025",
  time: "10:00 AM - 11:00 AM",
  title:
    "Elite Soccer ArenaElite Soccer Arena Elite Soccer Arena Elite Soccer Arena Known as the 'Home of Football,' emblem hosts major finals and international matches. It has a 90,000-seat capacity and a retractable roof  ",
  description:
    "Known as the 'Home of Football,' emblem hosts major finals and international matches. It has a 90,000-seat capacity and a retractable roof Known as the 'Home of Football,' emblem hosts major finals and international matches. It has a 90,000-seat capacity and a retractable roof Known as the 'Home of Football,' emblem hosts major finals and international matches. It has a 90,000-seat capacity and a retractable roof Known as the 'Home of Football,' emblem hosts major finals and international matches. It has a 90,000-seat capacity and a retractable roof Known as the 'Home of Football,' emblem hosts major finals and international matches. It has a 90,000-seat capacity and a retractable roof Known as the 'Home of Football,' emblem hosts major finals and international matches. It has a 90,000-seat capacity and a retractable roof  ",
};

export default function BookedListDetails() {
  return (
    <div className="min-h-screen bg-secondary p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Flex container for image and details */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <Image
              src={data.image}
              alt="venue_image"
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-64 lg:h-auto"
            />
          </div>

          {/* Details */}
          <div className="w-full lg:w-1/2 text-primary">
            <h1 className="text-3xl lg:text-4xl font-bold">
              {data.name}
              <p className="text-sm text-gray-400 mt-2">{data.address}</p>
            </h1>
            <p className="text-xl lg:text-2xl mt-4">
              Price: ${data.price} / Points: {data.points}
            </p>
            <p className="text-xl lg:text-2xl mt-2">
              Max Capacity: {data.max_capacity}
            </p>
            <p className="text-lg lg:text-xl mt-4">
              {data.date} at {data.time}
            </p>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mt-8 lg:mt-12">
          <h2 className="text-xl lg:text-2xl font-bold">{data.title}</h2>
          <p className="mt-4 text-lg lg:text-xl">{data.description}</p>
        </div>
      </div>
    </div>
  );
}
