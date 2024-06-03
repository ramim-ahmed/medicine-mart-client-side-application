import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function AdminDashboardLayout() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);
  return (
    <div className="grid grid-cols-12 lg:min-h-screen lg:gap-8">
      <div className="lg:col-span-2 col-span-12">
        <AdminSidebar />
      </div>
      <div className="lg:col-span-10 col-span-12 bg-gray-50 lg:my-5 lg:mr-5">
        <div className="rounded-md bg-white p-5 m-5">
          {loaded ? (
            <Outlet />
          ) : (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
