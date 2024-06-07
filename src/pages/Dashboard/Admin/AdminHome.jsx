import MetaData from "@/components/MetaData";
import Spinner from "@/components/Spinner";
import AdminHomeChart from "@/components/chart/AdminHomeChart";
import useSecureApi from "@/hooks/useSecureApi";
import { useQuery } from "@tanstack/react-query";

export default function AdminHome() {
  const secureApi = useSecureApi();
  const { data, isLoading } = useQuery({
    queryKey: ["sales-revenue"],
    queryFn: async () => await secureApi.get("/payments/total-sales-revenue"),
  });
  return (
    <>
      <MetaData title="Admin Dashboard | Home" />
      <div>
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div>
            <div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 grid-cols-1">
                {data?.data?.data?.map((revenue, idx) => (
                  <div
                    key={idx}
                    className="border flex justify-center p-8 bg-themeColor text-white"
                  >
                    <div>
                      <h1 className="text-5xl font-bold">
                        ${revenue.totalAmount}
                      </h1>
                      <h4 className="text-center mt-2">{revenue?.status}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <AdminHomeChart data={data?.data?.data} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
