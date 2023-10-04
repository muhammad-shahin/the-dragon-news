import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import routes from "./components/Router/Routes";
import AuthProvider from "./components/AuthProvider/AuthProvider";

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
