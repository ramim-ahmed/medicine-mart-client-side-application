import { useQuery } from "@tanstack/react-query";
import Category from "./Category";
import useBaseApi from "@/hooks/useBaseApi";
import Spinner from "@/components/Spinner";

export default function Categories() {
  const baseApi = useBaseApi();
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await baseApi.get("/categories"),
  });
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-3">
        <div className="text-center">
          <h3 className="text-2xl font-medium">Shop By Categories</h3>
          <div className="flex justify-center mt-2">
            <div className="border-b-2 border-themeColor w-44"></div>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 pt-10">
            {data?.data?.data.map((item) => (
              <Category key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
