import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";
import RootLayout from "@/Layouts/RootLayout";
import SellerDashboardLayout from "@/Layouts/SellerDashboardLayout";
import UserDashboardLayout from "@/Layouts/UserDashboardLayout";
import Login from "@/pages/Auth/Login/Login";
import Register from "@/pages/Auth/Register/Register";
import Cart from "@/pages/Cart/Cart";
import AdminHome from "@/pages/Dashboard/Admin/AdminHome";
import BannerAdvertisement from "@/pages/Dashboard/Admin/BannerAdvertisement";
import Categories from "@/pages/Dashboard/Admin/Categories";
import PaymentManage from "@/pages/Dashboard/Admin/PaymentManage";
import SalesReport from "@/pages/Dashboard/Admin/SalesReport";
import User from "@/pages/Dashboard/Admin/User";
import AskForAdvertisement from "@/pages/Dashboard/Seller/AskForAdvertisement";
import MedicineManage from "@/pages/Dashboard/Seller/MedicineManage";
import PaymentHistory from "@/pages/Dashboard/Seller/PaymentHistory";
import SellerHome from "@/pages/Dashboard/Seller/SellerHome";
import MyQueries from "@/pages/Dashboard/User/MyQueries";
import UserPaymentHistory from "@/pages/Dashboard/User/UserPaymentHistory";
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
    path: "/dashboard/admin",
    element: <AdminDashboardLayout />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "users",
        element: <User />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "sales-report",
        element: <SalesReport />,
      },
      {
        path: "payments",
        element: <PaymentManage />,
      },
      {
        path: "banner-advertisement",
        element: <BannerAdvertisement />,
      },
    ],
  },
  {
    path: "/dashboard/seller",
    element: <SellerDashboardLayout />,
    children: [
      {
        index: true,
        element: <SellerHome />,
      },
      {
        path: "medicines",
        element: <MedicineManage />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "ask-advertisement",
        element: <AskForAdvertisement />,
      },
    ],
  },
  {
    path: "/dashboard/user",
    element: <UserDashboardLayout />,
    children: [
      {
        index: true,
        element: <MyQueries />,
      },
      {
        path: "payment-history",
        element: <UserPaymentHistory />,
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
]);

export default routes;
