import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setDomLoaded(true);
    }, 2000);
  }, []);

  if (!domLoaded) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <CgSpinner className="h-12 w-12 animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
