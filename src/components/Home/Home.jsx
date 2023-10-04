import Navbar from "../Navbar/Navbar";
import LeftSideNav from "../LeftSideNav/LeftSideNav";
import RightSideNav from "../RightSideNav/RightSideNav";
import NewsMarquee from "../UI/NewsMarquee";
import { useLoaderData } from "react-router-dom";
import ShowHomeNews from "./ShowHomeNews";

const Home = () => {
  const newsData = useLoaderData();

  return (
    <section>
      <NewsMarquee />
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">
        {/* Left Content */}
        <div>
          <LeftSideNav newsData={newsData} />
        </div>

        {/* Home Content */}
        <div className="lg:col-span-2">
          <h1 className="text-20 text-primary font-bold mb-5">
            The Dragon News - Todays Highlights
          </h1>

          <div className="space-y-6">
            {newsData.map((news, index) => (
              <ShowHomeNews key={index} news={news} />
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div>
          <RightSideNav />
        </div>
      </div>
    </section>
  );
};

export default Home;
