import { AiOutlineCalendar } from "react-icons/ai";
import PropTypes from "prop-types";

const ShowSidebarNews = ({ news, categories }) => {
  const { image_url, title, category_id, author } = news;

  const categoryName = categories.filter(
    (category) => category.id === category_id
  );

  // Input date string
  const inputDate = new Date(author.published_date);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);

  return (
    <div className="space-y-3 mb-5 border-2  rounded-lg cursor-pointer p-2">
      <img className="rounded-lg" src={image_url} alt="" />
      <h2 className="text-[16px] text-primary font-bold">{title}</h2>
      <div className="flex justify-between items-center">
        <p className="text-secondary font-medium">{categoryName[0]?.name}</p>

        <p className="text-tertiary font-medium flex justify-center items-center gap-2">
          <AiOutlineCalendar className="text-20 text-primary" />
          {formattedDate}
        </p>
      </div>
    </div>
  );
};

ShowSidebarNews.propTypes = {
  news: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
};

export default ShowSidebarNews;
