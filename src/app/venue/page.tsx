import Image, { StaticImageData } from "next/image";
import VENUE_IMG from "../../assets/venue_img.png";

type Venue = {
  _id: number;
  image: StaticImageData;
  title: string;
  description: string;
};

// Dummy JSON data
const venues: Venue[] = [
  {
    _id: 1,
    image: VENUE_IMG,
    title: "Wembley Stadium",
    description:
      'Known as the "Home of Football," hosts major finals and international matches.',
  },
  {
    _id: 2,
    image: VENUE_IMG,
    title: "Elite Soccer Arena",
    description:
      "State-of-the-art football field for players of all levels, with top-quality artificial turf.",
  },
  {
    _id: 3,
    image: VENUE_IMG,
    title: "Local Soccer Field",
    description:
      "Perfect for casual games and local tournaments, offering a great playing experience.",
  },
];

const Venue: React.FC = () => {
  return (
    <div className="min-h-screen p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Venue</h1>
        <p className="mt-4">
          Book a soccer venue effortlessly for matches, training, or events.
          Choose top facilities, check availability, and secure your spot
          online. Perfect for teams, tournaments, and casual games. Reserve now!
        </p>
      </header>

      <div className="space-y-8">
        {venues.map((venue) => (
          <div
            key={venue._id}
            className="flex flex-col md:flex-row w-full rounded overflow-hidden shadow-lg"
          >
            {/* Left Side: Image */}
            <div className="w-full md:w-1/2 relative h-64 md:h-auto">
              <Image
                src={venue.image}
                alt={venue.title}
                layout="fill" // Fill the container
                objectFit="cover" // Ensure the image covers the area
                className="w-full h-full"
              />
            </div>

            {/* Right Side: Text and Buttons */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <div className="font-bold text-xl mb-2">{venue.title}</div>
                <p className="text-gray-700 text-base">{venue.description}</p>
              </div>
              <div className="mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Details
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Book now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Venue;
