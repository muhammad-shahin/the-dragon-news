import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const NewsMarquee = () => {
  return (
    <div className="bg-[#F3F3F3] w-full p-4 mx-auto overflow-hidden text-center">
      <div className="w-fit flex lg:flex-row flex-col justify-center items-center gap-5">
        <p className="bg-rose-600 font-medium text-20 leading-8 py-1 px-6 text-white mx-auto">
          Latest
        </p>
        <Marquee className="" speed={100}>
          <div className="lg:w-auto lg:flex">
            <p className="mx-6">
              Match Highlights: Germany vs Spain — as it happened ! Match
              Highlights: Germany vs Spain as Match Highlights: Germany vs Spain
              — as it happened ! Match Highlights: Germany vs Spain as
            </p>
            <Link className="text-blue-600" to="/sign-up">
              Read More News Category
            </Link>
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default NewsMarquee;
