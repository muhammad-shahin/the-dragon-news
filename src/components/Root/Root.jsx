import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Root = () => {
  return (
    <main className="lg:max-w-[1440px] mx-auto font-poppins max-w-[90%] lg:px-[5%]">
      <Header />
      <Outlet />
    </main>
  );
};

export default Root;
