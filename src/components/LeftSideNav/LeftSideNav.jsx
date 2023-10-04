import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ShowSidebarNews from "./ShowSidebarNews";

const LeftSideNav = ({ newsData }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const newsLeftSideBar = newsData.slice(newsData.length - 3, newsData.length);

  return (
    <div>
      <h2 className="text-20 text-primary font-bold mb-6">All Categories</h2>
      <div>
        <h3 className="text-20 text-primary font-bold bg-gray-200 px-6 py-2 text-center">
          National News
        </h3>
        {/* categories */}
        <div>
          {categories.map((category) => (
            <button
              key={category.id}
              className="w-full text-18 text-tertiary font-semibold text-justify my-2 hover:text-sky-500 duration-500"
            >
              {category.name}
            </button>
          ))}
        </div>
        {/* left sidebar news */}
        <div className="mt-8">
          {newsLeftSideBar.map((news, index) => (
            <ShowSidebarNews key={index} news={news} categories={categories} />
          ))}
        </div>
      </div>
    </div>
  );
};

LeftSideNav.propTypes = {
  newsData: PropTypes.array.isRequired,
};

export default LeftSideNav;
