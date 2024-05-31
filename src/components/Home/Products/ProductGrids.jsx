import ProductItem from "./ProductItem";
import "swiper/css";
import "swiper/css/navigation";
export default function ProductGrids() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-3">
        <div className="text-center">
          <h3 className="text-2xl font-medium">Top Recent Products</h3>
          <div className="flex justify-center mt-2">
            <div className="border-b-2 border-themeColor w-44"></div>
          </div>
        </div>
        <div className="pt-10 grid grid-cols-3 gap-2">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </div>
      </div>
    </div>
  );
}
