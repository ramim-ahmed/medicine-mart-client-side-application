import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useBaseApi from "@/hooks/useBaseApi";
import Spinner from "../Spinner";
export default function Banner() {
  const baseApi = useBaseApi();
  const { data, isLoading } = useQuery({
    queryKey: ["banner-slides"],
    queryFn: async () => await baseApi.get("/advertisements/approved"),
  });
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-3 pt-10">
      <Swiper
        speed={1200}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {data?.data?.data?.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="bg-gradient-to-r from-gray-50 to-white lg:p-20 p-5 w-full rounded-xl lg:flex border">
              <div className="lg:w-1/2 w-full space-y-3">
                <div>
                  <h1 className="text-3xl font-bold">{item.name}</h1>
                  <p>{item.genericName}</p>
                </div>
                <p>{item.description}</p>
                <p>{item?.company?.name}</p>
                <div className="mt-4 flex items-center space-x-2">
                  <img
                    className="w-10 h-10 object-cover rounded-full border-themeColor"
                    src={item?.seller?.photo}
                    alt=""
                  />
                  <div>
                    <p className="font-medium">{item?.seller?.name}</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 w-full flex justify-center">
                <img className="w-60" src={item?.image} alt="" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
