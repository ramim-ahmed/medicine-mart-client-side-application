import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import ProductItem from "./Home/Products/ProductItem";
export default function DiscountsProduct() {
  return (
    <div className="max-w-7xl mx-auto px-3 pt-16">
      <div className="text-center">
        <h3 className="text-2xl font-medium">Special Discount</h3>
        <div className="flex justify-center mt-2">
          <div className="border-b-2 border-themeColor w-36"></div>
        </div>
      </div>
      <div className="pt-10">
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>
          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>
          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>
          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
