import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
