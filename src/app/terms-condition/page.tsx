import localImage from "../../assets/about/about-us.png";

export default function Terms() {
  return (
    <div className="min-h-screen bg-secondary">
      <div
        className="relative h-64 text-center bg-cover bg-center py-40"
        style={{ backgroundImage: `url(${localImage.src})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <h3 className="text-4xl font-bold text-primary relative z-10">
          Terms and Condition
        </h3>
        <p className=" md:w-[50%] mx-auto text-white ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea
          repudiandae magni animi voluptas cupiditate ipsa fugiat. Iste tenetur
          id officiis! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Ea repudiandae magni
        </p>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className=" p-6 rounded-lg shadow-md mb-8">
          <h4 className="text-2xl font-semibold text-primary mb-4">
            Our Mission
          </h4>
          <p className="">
            Our mission is to provide innovative solutions that empower
            individuals and businesses to achieve their goals. We are committed
            to delivering high-quality services and fostering a culture of
            excellence and integrity.
          </p>
        </div>

        <div className=" p-6 rounded-lg shadow-md mb-8">
          <h4 className="text-2xl font-semibold text-primary mb-4">
            What We Offer
          </h4>
          <p className="">
            We offer a wide range of services designed to meet the diverse needs
            of our clients. From consulting and strategy development to
            implementation and support, we are here to help you succeed.
          </p>
        </div>

        <div className=" p-6 rounded-lg shadow-md mb-8">
          <h4 className="text-2xl font-semibold text-primary mb-4">
            Lorem Sincere Hastie & Insights
          </h4>
          <p className="">
            Our team of experts brings a wealth of knowledge and experience to
            the table. We provide insightful analysis and actionable
            recommendations to help you navigate complex challenges and seize
            new opportunities.
          </p>
        </div>

        <div className=" p-6 rounded-lg shadow-md mb-8">
          <h4 className="text-2xl font-semibold text-primary mb-4">
            Our Vision for the Future
          </h4>
          <p className="">
            We envision a future where innovation and collaboration drive
            sustainable growth and positive change. Our goal is to be a trusted
            partner in shaping a better tomorrow for our clients and
            communities.
          </p>
        </div>
      </div>
    </div>
  );
}
