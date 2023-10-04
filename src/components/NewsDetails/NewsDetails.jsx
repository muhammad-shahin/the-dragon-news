import { useLoaderData, useParams } from "react-router-dom";
import RightSideNav from "../RightSideNav/RightSideNav";
import { AiOutlineArrowLeft } from "react-icons/ai";

const NewsDetails = () => {
  const newsData = useLoaderData();
  const { newsId } = useParams();
  const currentNews = newsData.find((news) => (news._id = newsId));
  const { image_url, title, details } = currentNews;

  return (
    <section className="grid lg:grid-cols-4 grid-cols-1 gap-10">
      {/* News Details Card */}
      <div className="lg:col-span-3">
        <h5 className="text-18 font-semibold text-primary mb-5">Dragon News</h5>
        <div className="border-2 border-gray-300 p-8 rounded-lg">
          <img src={image_url} alt="News Cover" />
          <div className="">
            <h1 className="font-bold lg:text-[32px] text-[26px] text-primary mt-3">
              {title}
            </h1>
            <p className="font-medium  text-secondary mt-5">{details}</p>
            <button className="py-4 px-5 lg:w-[323px] bg-rose-600 text-white text-20 flex justify-center items-center gap-4 mt-10">
              <AiOutlineArrowLeft />
              All News in this category
            </button>
          </div>
        </div>
      </div>
      {/* Right Side Bar */}
      <RightSideNav />
    </section>
  );
};

export default NewsDetails;
