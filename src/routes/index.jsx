import DashboardLayout from "@/Layouts/DashboardLayout";
import RootLayout from "@/Layouts/RootLayout";
import Login from "@/pages/Auth/Login/Login";
import Register from "@/pages/Auth/Register/Register";
import Cart from "@/pages/Cart/Cart";
import Home from "@/pages/Home/Home";
import NotFound from "@/pages/NotFound/NotFound";
import Shop from "@/pages/Shop/Shop";
import { createBrowserRouter } from "react-router-dom";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "my-cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
  },
]);

export default routes;
