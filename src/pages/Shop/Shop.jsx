import MetaData from "@/components/MetaData";
import Spinner from "@/components/Spinner";
import MedicineListsTable from "@/components/Table/MedicineListsTable";
import { Button } from "@/components/ui/button";
import useBaseApi from "@/hooks/useBaseApi";
import { useQuery } from "@tanstack/react-query";

export default function Shop() {
  const baseApi = useBaseApi();
  const { data, isLoading } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => await baseApi.get("/medicines"),
  });
  return (
    <>
      <MetaData title="Medicine Mart | Shop" />
      <div className="pt-8">
        <div className="max-w-7xl mx-auto px-3">
          <div>
            <Button variant="outline">All Medicines Lists</Button>
          </div>
          <div className="mt-2 bg-white">
            {isLoading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              <MedicineListsTable medicines={data?.data?.data} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
