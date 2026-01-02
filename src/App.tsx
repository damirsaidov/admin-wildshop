import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout";
import Login from "./pages/login";
import Profile from "./pages/account";
import Home from "./pages/home";
import AboutProduct from "./pages/aboutProduct";
import Categories from "./pages/categories";
import Colors from "./pages/colors";
import SubCategories from "./pages/subCategories";
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
          path: "colors",
          element: <Colors />,
        },
        {
          path: "products/:id",
          element: <AboutProduct />,
        },
        {
          path: "SubCategories",
          element: <SubCategories />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default App;
