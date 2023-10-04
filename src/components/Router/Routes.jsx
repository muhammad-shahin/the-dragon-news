import Home from "../Home/Home";
import Login from "../Login/Login";
import NewsDetails from "../NewsDetails/NewsDetails";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Root from "../Root/Root";
import SignUp from "../SignUp/SignUp";

const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        loader: () => fetch("/news.json"),
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/news-details/:newsId",
        loader: () => fetch("/news.json"),
        element: (
          <PrivateRoute>
            <NewsDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
];

export default routes;
