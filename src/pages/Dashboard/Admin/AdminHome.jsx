import MetaData from "@/components/MetaData";

export default function AdminHome() {
  return (
    <>
      <MetaData title="Admin Dashboard | Home" />
      <div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 grid-cols-1">
          <div className="border flex justify-center p-8 bg-themeColor text-white">
            <div>
              <h1 className="text-5xl font-bold">$125</h1>
              <h4 className="text-center mt-2">Total Sales</h4>
            </div>
          </div>
          <div className="border flex justify-center p-8 bg-themeColor text-white">
            <div>
              <h1 className="text-5xl font-bold">$102</h1>
              <h4 className="text-center mt-2">Total Paid</h4>
            </div>
          </div>
          <div className="border flex justify-center p-8 bg-themeColor text-white">
            <div>
              <h1 className="text-5xl font-bold">$23</h1>
              <h4 className="text-center mt-2">Total Pending</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
