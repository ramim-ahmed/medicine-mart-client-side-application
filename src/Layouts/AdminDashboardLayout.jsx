import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminDashboardLayout() {
  return (
    <div className="grid grid-cols-12 lg:min-h-screen lg:gap-8">
      <div className="lg:col-span-2 col-span-12">
        <AdminSidebar />
      </div>
      <div className="lg:col-span-10 col-span-12 bg-gray-50 lg:my-5 lg:mr-5">
        <div className="rounded-md bg-white p-5 m-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
