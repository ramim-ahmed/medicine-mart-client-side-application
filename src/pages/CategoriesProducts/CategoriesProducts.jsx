import useBaseApi from "@/hooks/useBaseApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { GrDocumentMissing } from "react-icons/gr";
import MedicineListsTable from "@/components/Table/MedicineListsTable";
import Spinner from "@/components/Spinner";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
export default function CategoriesProducts() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const baseApi = useBaseApi();
  const { data, isLoading } = useQuery({
    queryKey: ["categories-wise", id],
    queryFn: async () => baseApi.get(`/medicines/categories/${id}`),
  });
  const handleGoBack = () => {
    navigate(-1 || "/");
  };
  return (
    <div className="max-w-7xl mx-auto px-3 pb-10">
      <div className="pt-10">
        <div className="pb-3">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <FaArrowLeftLong />
            <p>Go Back</p>
          </Button>
        </div>
        <div className="bg-themeColor p-10 rounded-md">
          <h1 className="uppercase text-xl text-center text-white font-bold">
            {category}
          </h1>
        </div>
      </div>
      <div className="mt-10">
        {isLoading ? (
          <div className="flex justify-center pt-10">
            <Spinner />
          </div>
        ) : data?.data?.data?.length > 0 ? (
          <MedicineListsTable medicines={data?.data?.data} />
        ) : (
          <div className="flex justify-center pt-2">
            <div className="flex flex-col items-center">
              <GrDocumentMissing className="w-12 h-12 text-red-400" />
              <h3 className="text-bold mt-2 text-red-400">
                Not Found Products On Category
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
