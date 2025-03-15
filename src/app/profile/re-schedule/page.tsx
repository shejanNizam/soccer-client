import Link from "next/link";

// Dummy data array
const dummyData = [
  {
    id: 1,
    icon: "📅", // You can replace this with an actual icon component
    title: "Meeting with Team",
    details: "Discuss project updates",
    day: "Monday",
  },
  {
    id: 2,
    icon: "📅",
    title: "Client Call",
    details: "Review contract details",
    day: "Tuesday",
  },
  {
    id: 3,
    icon: "📅",
    title: "Workshop",
    details: "React best practices",
    day: "Wednesday",
  },
];

export default function ReSchedule() {
  return (
    <div className="flex flex-col items-center p-5">
      {dummyData.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center w-full md:w-3/4 lg:w-2/3 p-5 my-3 shadow-md rounded-lg bg-[#D9D9D91A] "
        >
          {/* Left side: Icon and text */}
          <div className="flex items-center space-x-4 ">
            <span className="text-2xl ">{item.icon}</span>
            <div>
              <h3 className="text-lg font-semibold  text-primary">
                {item.title}
              </h3>
              <p className="text-sm ">{item.details}</p>
              <p className="text-sm text-primary">{item.day}</p>
            </div>
          </div>

          {/* Right side: Reschedule button */}
          <Link href={`/book-venue`}>
            <button className="bg-button text-white px-4 py-2 rounded-md hover:bg-button/90 transition-colors">
              Reschedule
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
