import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import ProductItem from "./Home/Products/ProductItem";
import { useQuery } from "@tanstack/react-query";
import useBaseApi from "@/hooks/useBaseApi";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
export default function DiscountsProduct() {
  const baseApi = useBaseApi();
  const { data, isLoading } = useQuery({
    queryKey: ["discountable-products"],
    queryFn: async () => await baseApi.get("/medicines/discountable-products"),
  });
  return (
    <div className="max-w-7xl mx-auto px-3 pt-16">
      <div className="text-center">
        <h3 className="text-2xl font-medium">Special Discount</h3>
        <div className="flex justify-center mt-2">
          <div className="border-b-2 border-themeColor w-36"></div>
        </div>
      </div>
      <div className="flex justify-end">
        <Link to="/shop">
          <Button variant="outline">See All</Button>
        </Link>
      </div>
      <div className="pt-10">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {data?.data?.data?.map((item) => (
              <SwiperSlide key={item._id}>
                <ProductItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
