import PropTypes from "prop-types";
import { BsFillBookmarkFill, BsShareFill, BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const ShowHomeNews = ({ news }) => {
  const { image_url, title, author, details, rating, total_view, _id } = news;
  return (
    <div className=" border-2 border-gray-200 rounded-lg">
      <div className="bg-gray-100 p-4 flex justify-between items-center rounded-lg">
        <div className=" flex justify-start items-center gap-3">
          <img
            className="w-[40px] h-[40px] rounded-full object-cover"
            src={author.img}
            alt="Author Image"
          />
          <div className="">
            <p className="font-semibold text-primary text-18">{author.name}</p>
            <p className="text-tertiary">2022-08-21</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3">
          <BsFillBookmarkFill className="text-gray-600" />
          <BsShareFill className="text-gray-600" />
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-20 text-primary font-bold leading-8 mb-5">
          {title}
        </h2>
        <img className="mb-4" src={image_url} alt="News Cover Image" />
        {details.length > 200 ? (
          <p className="text-18 text-primary font-medium leading-8">
            {details.slice(0, 300)}
          </p>
        ) : (
          <p className="text-18 text-primary font-medium leading-8">
            {details}
          </p>
        )}

        <Link to={`/news-details/${_id}`}>
          <p className="text-orange-400">Read More</p>
        </Link>
        <hr className="my-4" />
        <div className="flex justify-between items-center">
          <div className="rating">
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              checked
              onChange={() => {}}
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <span className="ml-3 text-secondary font-medium text-center">
              {rating.number}
            </span>
          </div>
          <div>
            <p className="text-secondary flex justify-end items-center gap-2 text-18">
              <BsEyeFill /> {total_view}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ShowHomeNews.propTypes = {
  news: PropTypes.object.isRequired,
};

export default ShowHomeNews;
