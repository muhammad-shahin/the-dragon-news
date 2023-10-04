import { Navigate, useNavigate } from "react-router-dom";
import siteLogo from "../../assets/logo.png";
const Header = () => {
  // Get the current date
  const currentDate = new Date();

  // Define arrays for days of the week and months
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  // Get the day, month, and year
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  // Format the date as "DayOfWeek, Month Day, Year"
  const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;

  return (
    <header className="pt-12 mb-5 text-center">
      <div className="w-fit mx-auto">
        <img
          className="cursor-pointer"
          src={siteLogo}
          alt="Dragon News Logo"
          onClick={goHome}
        />
      </div>
      <div>
        <h2 className="text-18 text-secondary leading-8 mt-5 mb-2">
          Journalism Without Fear or Favour
        </h2>
        <p className="text-primary text-20 font-medium leading-8">
          {formattedDate}
        </p>
      </div>
    </header>
  );
};

export default Header;
