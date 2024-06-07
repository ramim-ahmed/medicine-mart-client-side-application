import { useQuery } from "@tanstack/react-query";
import ProductItem from "./ProductItem";
import "swiper/css";
import "swiper/css/navigation";
import useBaseApi from "@/hooks/useBaseApi";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function ProductGrids() {
  const baseApi = useBaseApi();
  const { data, isLoading } = useQuery({
    queryKey: ["medicines-home"],
    queryFn: async () => await baseApi.get("/medicines/medicines-for-home"),
  });
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-3">
        <div className="text-center">
          <h3 className="text-2xl font-medium">Top Recent Products</h3>
          <div className="flex justify-center mt-2">
            <div className="border-b-2 border-themeColor w-44"></div>
          </div>
        </div>
        <div className="flex justify-end">
          <Link to="/shop">
            <Button variant="outline">See All</Button>
          </Link>
        </div>
        <div>
          {isLoading ? (
            <div className="pt-10 flex justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="pt-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2">
              {data?.data?.data?.map((item) => (
                <ProductItem key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
