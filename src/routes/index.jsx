import DashboardLayout from "@/Layouts/DashboardLayout";
import RootLayout from "@/Layouts/RootLayout";
import Cart from "@/pages/Cart/Cart";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import NotFound from "@/pages/NotFound/NotFound";
import Register from "@/pages/Register/Register";
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
