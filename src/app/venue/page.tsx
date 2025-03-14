import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import VENUE_IMG from "../../assets/venue_img.png";

type Venue = {
  _id: number;
  name: string;
  image: StaticImageData;
  title: string;
  description: string;
};

// Dummy JSON data
const venues: Venue[] = [
  {
    _id: 1,
    image: VENUE_IMG,
    name: " ABCD  ",
    title: "Wembley Stadium",
    description:
      'Known as the "Home of Football," hosts major finals and international matches. Perfect for casual games and local tournaments, offering a great playing experience.',
  },
  {
    _id: 2,
    image: VENUE_IMG,
    name: " ABCD  ",
    title: "Elite Soccer Arena",
    description:
      "State-of-the-art football field for players of all levels, with top-quality artificial turf. Perfect for casual games and local tournaments, offering a great playing experience.",
  },
  {
    _id: 3,
    image: VENUE_IMG,
    name: " ABCD  ",
    title: "Local Soccer Field",
    description:
      "Perfect for casual games and local tournaments, offering a great playing experience. Perfect for casual games and local tournaments, offering a great playing experience.",
  },
];

const Venue: React.FC = () => {
  return (
    <div className="min-h-screen py-40">
      <header className="text-center mb-8">
        <h1 className="text-4xl text-primary font-bold">Venue</h1>
        <p className="mt-4 md:w-[40%] mx-auto ">
          Book a soccer venue effortlessly for matches, training, or events.
          Choose top facilities, check availability, and secure your spot
          online. Perfect for teams, tournaments, and casual games. Reserve now!
        </p>
      </header>

      <div className="space-y-8 md:w-[60%] mx-auto ">
        {venues?.map((venue) => (
          <div
            key={venue?._id}
            className="flex flex-col md:flex-row items-center w-full rounded overflow-hidden shadow-lg"
          >
            {/* Left Side: Image */}
            <div className="w-full md:w-1/2 relative h-64 md:h-auto">
              <Image
                src={venue.image}
                alt="Venue Image"
                width={1000}
                height={1000}
                className="rounded-lg w-full h-auto"
              />
            </div>

            {/* Right Side: Text and Buttons */}
            <div className="w-full md:w-1/2 p-6 flex flex-col">
              <div>
                <h1 className="text-4xl text-primary font-bold">
                  {" "}
                  {venue.name}{" "}
                </h1>
                <h4 className="font-bold text-xl mb-2">{venue.title}</h4>
                <p>{venue.description}</p>
              </div>
              <div className="mt-4">
                <Link href={`/venue/${venue._id}`}>
                  <button className="bg-button hover:bg-button/90 text-white font-bold py-2 px-4 rounded mr-2">
                    Details
                  </button>
                </Link>
                <Link href={`/book-venue`}>
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
