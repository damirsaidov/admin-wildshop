import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout";
import Login from "./pages/login";
import Profile from "./pages/account";
import Home from "./pages/home";
import AboutProduct from "./pages/aboutProduct";
import Categories from "./pages/categories";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "profile",
          element: <Profile />,
        },

        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "products/:id",
          element: <AboutProduct />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default App;
