import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";
import RootLayout from "@/Layouts/RootLayout";
import SellerDashboardLayout from "@/Layouts/SellerDashboardLayout";
import UserDashboardLayout from "@/Layouts/UserDashboardLayout";
import Login from "@/pages/Auth/Login/Login";
import Register from "@/pages/Auth/Register/Register";
import Cart from "@/pages/Cart/Cart";
import CategoriesProducts from "@/pages/CategoriesProducts/CategoriesProducts";
import Checkout from "@/pages/Checkout/Checkout";
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
import UserPaymentHistory from "@/pages/Dashboard/User/UserPaymentHistory";
import Home from "@/pages/Home/Home";
import Invoice from "@/pages/Invoice/Invoice";
import NotFound from "@/pages/NotFound/NotFound";
import Shop from "@/pages/Shop/Shop";
import UpdateProofile from "@/pages/UpdateProfile/UpdateProofile";
import { createBrowserRouter } from "react-router-dom";
import AdminPrivateRoute from "./AdminPrivateRoute";
import SellerPrivateRoute from "./SellerPrivateRoute";
import PrivateRoute from "./PrivateRoute";
import UserPrivateRoute from "./UserPrivateRoute";

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
        path: "/update-profile",
        element: (
          <PrivateRoute>
            <UpdateProofile />
          </PrivateRoute>
        ),
      },
      {
        path: "/:category/:id",
        element: <CategoriesProducts />,
      },
      {
        path: "/my-cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "/invoice-page/:orderId",
        element: (
          <PrivateRoute>
            <Invoice />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard/admin",
    element: (
      <AdminPrivateRoute>
        <AdminDashboardLayout />
      </AdminPrivateRoute>
    ),
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
    element: (
      <SellerPrivateRoute>
        <SellerDashboardLayout />
      </SellerPrivateRoute>
    ),
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
    element: (
      <UserPrivateRoute>
        <UserDashboardLayout />
      </UserPrivateRoute>
    ),
    children: [
      {
        index: true,
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
